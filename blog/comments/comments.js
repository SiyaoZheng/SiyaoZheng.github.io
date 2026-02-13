/**
 * Blog Comment Widget
 * Dependencies: Supabase JS client (loaded via CDN), ProfanityFilter, DOMPurify
 */
(function () {
    'use strict';

    // ===== Configuration =====
    // Replace these with your actual Supabase credentials
    const SUPABASE_URL = 'YOUR_SUPABASE_URL';
    const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

    const RATE_LIMIT_KEY = 'comment_timestamps';
    const RATE_LIMIT_MAX = 5;          // max comments per window
    const RATE_LIMIT_WINDOW = 600000;  // 10 minutes in ms
    const MIN_SUBMIT_TIME = 3000;      // 3 seconds minimum before submit

    // ===== State =====
    let supabase = null;
    let postSlug = '';
    let comments = [];
    let formOpenTime = 0;

    // ===== Init =====
    function init() {
        const section = document.getElementById('comments');
        if (!section) return;

        postSlug = section.dataset.slug || deriveSlug();

        // Initialize Supabase client
        if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
            renderSetupMessage(section);
            return;
        }

        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        renderShell(section);
        loadComments();
    }

    function deriveSlug() {
        const path = window.location.pathname;
        const match = path.match(/\/blog\/(.+?)\.html/);
        return match ? match[1] : path.replace(/\//g, '-').replace(/^-|-$/g, '');
    }

    // ===== Rendering =====

    function renderSetupMessage(container) {
        const shell = document.createElement('div');
        shell.className = 'comments-section';
        shell.innerHTML = '';
        const hr = document.createElement('hr');
        shell.appendChild(hr);

        const title = document.createElement('h2');
        title.className = 'comments-section-title';
        title.textContent = 'Discussion';
        shell.appendChild(title);

        const msg = document.createElement('p');
        msg.className = 'comments-empty';
        msg.textContent = 'Comments will be available once Supabase is configured.';
        shell.appendChild(msg);

        container.appendChild(shell);
    }

    function renderShell(container) {
        container.innerHTML = '';

        const shell = document.createElement('div');
        shell.className = 'comments-section';

        const hr = document.createElement('hr');
        shell.appendChild(hr);

        const title = document.createElement('h2');
        title.className = 'comments-section-title';
        title.textContent = 'Discussion';
        shell.appendChild(title);

        const list = document.createElement('div');
        list.className = 'comments-list';
        list.id = 'comments-list';
        const loading = document.createElement('p');
        loading.className = 'comment-loading';
        loading.textContent = 'Loading comments...';
        list.appendChild(loading);
        shell.appendChild(list);

        shell.appendChild(buildForm(null));

        container.appendChild(shell);
        formOpenTime = Date.now();
    }

    function renderComments() {
        const list = document.getElementById('comments-list');
        if (!list) return;
        list.innerHTML = '';

        const topLevel = comments.filter(c => !c.parent_id);

        if (topLevel.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'comments-empty';
            empty.textContent = 'No comments yet. Be the first to share your thoughts.';
            list.appendChild(empty);
            return;
        }

        topLevel.forEach(comment => {
            list.appendChild(buildComment(comment));
        });
    }

    function buildComment(comment) {
        const wrapper = document.createElement('div');
        wrapper.className = 'comment';
        wrapper.dataset.id = comment.id;

        // Card
        const card = document.createElement('div');
        card.className = 'comment-card';

        // Avatar
        const avatar = document.createElement('div');
        avatar.className = 'comment-avatar';
        avatar.textContent = getInitials(comment.author_name);
        card.appendChild(avatar);

        // Content
        const content = document.createElement('div');
        content.className = 'comment-content';

        const header = document.createElement('div');
        header.className = 'comment-header';

        const authorEl = document.createElement('span');
        authorEl.className = 'comment-author';
        authorEl.textContent = comment.author_name;
        header.appendChild(authorEl);

        const timeEl = document.createElement('span');
        timeEl.className = 'comment-time';
        timeEl.textContent = relativeTime(comment.created_at);
        timeEl.title = new Date(comment.created_at).toLocaleString();
        header.appendChild(timeEl);

        content.appendChild(header);

        const body = document.createElement('div');
        body.className = 'comment-body';
        renderBody(body, comment.body);
        content.appendChild(body);

        // Actions
        const actions = document.createElement('div');
        actions.className = 'comment-actions';
        const replyBtn = document.createElement('button');
        replyBtn.className = 'comment-reply-btn';
        replyBtn.textContent = 'Reply';
        replyBtn.addEventListener('click', () => toggleReplyForm(wrapper, comment));
        actions.appendChild(replyBtn);
        content.appendChild(actions);

        card.appendChild(content);
        wrapper.appendChild(card);

        // Replies
        const replies = comments.filter(c => c.parent_id === comment.id);
        if (replies.length > 0) {
            const repliesDiv = document.createElement('div');
            repliesDiv.className = 'comment-replies';
            replies.forEach(reply => {
                repliesDiv.appendChild(buildReplyCard(reply));
            });
            wrapper.appendChild(repliesDiv);
        }

        return wrapper;
    }

    function buildReplyCard(reply) {
        const wrapper = document.createElement('div');
        wrapper.className = 'comment';

        const card = document.createElement('div');
        card.className = 'comment-card';

        const avatar = document.createElement('div');
        avatar.className = 'comment-avatar';
        avatar.textContent = getInitials(reply.author_name);
        card.appendChild(avatar);

        const content = document.createElement('div');
        content.className = 'comment-content';

        const header = document.createElement('div');
        header.className = 'comment-header';

        const authorEl = document.createElement('span');
        authorEl.className = 'comment-author';
        authorEl.textContent = reply.author_name;
        header.appendChild(authorEl);

        const timeEl = document.createElement('span');
        timeEl.className = 'comment-time';
        timeEl.textContent = relativeTime(reply.created_at);
        timeEl.title = new Date(reply.created_at).toLocaleString();
        header.appendChild(timeEl);

        content.appendChild(header);

        const body = document.createElement('div');
        body.className = 'comment-body';
        renderBody(body, reply.body);
        content.appendChild(body);

        card.appendChild(content);
        wrapper.appendChild(card);

        return wrapper;
    }

    function renderBody(container, text) {
        // Split into paragraphs, render each safely via textContent
        const paragraphs = text.split(/\n{2,}/);
        paragraphs.forEach(para => {
            const p = document.createElement('p');
            p.textContent = para.trim();
            if (p.textContent) container.appendChild(p);
        });
    }

    function toggleReplyForm(commentEl, parentComment) {
        // Remove any existing reply form
        const existing = commentEl.querySelector('.comment-reply-form');
        if (existing) {
            existing.remove();
            return;
        }

        // Remove reply forms elsewhere
        document.querySelectorAll('.comment-reply-form').forEach(f => f.remove());

        const formWrapper = document.createElement('div');
        formWrapper.className = 'comment-reply-form';

        const titleRow = document.createElement('div');
        titleRow.className = 'comment-form-title';

        const titleText = document.createTextNode('Reply to ' + parentComment.author_name);
        titleRow.appendChild(titleText);

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'comment-reply-cancel';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', () => formWrapper.remove());
        titleRow.appendChild(cancelBtn);

        formWrapper.appendChild(titleRow);
        formWrapper.appendChild(buildForm(parentComment.id));

        commentEl.appendChild(formWrapper);
        formOpenTime = Date.now();

        // Focus the name field
        const nameInput = formWrapper.querySelector('input[name="author_name"]');
        if (nameInput) nameInput.focus();
    }

    function buildForm(parentId) {
        const form = document.createElement('form');
        form.className = 'comment-form';
        form.noValidate = true;

        // Error/success messages
        const errorEl = document.createElement('div');
        errorEl.className = 'comment-error';
        form.appendChild(errorEl);

        const successEl = document.createElement('div');
        successEl.className = 'comment-success';
        form.appendChild(successEl);

        // Name + email row
        const row = document.createElement('div');
        row.className = 'comment-form-row';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'author_name';
        nameInput.placeholder = 'Name *';
        nameInput.required = true;
        nameInput.maxLength = 80;
        nameInput.autocomplete = 'name';
        row.appendChild(nameInput);

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'author_email';
        emailInput.placeholder = 'Email (optional, never shown)';
        emailInput.maxLength = 254;
        emailInput.autocomplete = 'email';
        row.appendChild(emailInput);

        form.appendChild(row);

        // Honeypot
        const hpLabel = document.createElement('label');
        hpLabel.className = 'comment-form-hp';
        hpLabel.setAttribute('aria-hidden', 'true');
        const hpInput = document.createElement('input');
        hpInput.type = 'text';
        hpInput.name = 'website';
        hpInput.tabIndex = -1;
        hpInput.autocomplete = 'off';
        hpLabel.appendChild(hpInput);
        form.appendChild(hpLabel);

        // Body
        const textarea = document.createElement('textarea');
        textarea.name = 'body';
        textarea.placeholder = 'Share your thoughts...';
        textarea.required = true;
        textarea.maxLength = 5000;
        form.appendChild(textarea);

        // Footer
        const footer = document.createElement('div');
        footer.className = 'comment-form-footer';

        const note = document.createElement('span');
        note.className = 'comment-form-note';
        note.textContent = 'Be respectful. No login required.';
        footer.appendChild(note);

        const submit = document.createElement('button');
        submit.type = 'submit';
        submit.className = 'comment-form-submit';
        submit.textContent = parentId ? 'Post Reply' : 'Post Comment';
        footer.appendChild(submit);

        form.appendChild(footer);

        // Hidden parent_id
        if (parentId) {
            const hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'parent_id';
            hidden.value = parentId;
            form.appendChild(hidden);
        }

        form.addEventListener('submit', handleSubmit);

        return form;
    }

    // ===== Data =====

    async function loadComments() {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('id, post_slug, parent_id, author_name, body, created_at')
                .eq('post_slug', postSlug)
                .eq('status', 'approved')
                .order('created_at', { ascending: true });

            if (error) throw error;
            comments = data || [];
            renderComments();
        } catch (err) {
            const list = document.getElementById('comments-list');
            if (list) {
                list.innerHTML = '';
                const errMsg = document.createElement('p');
                errMsg.className = 'comments-empty';
                errMsg.textContent = 'Could not load comments. Please try again later.';
                list.appendChild(errMsg);
            }
            console.error('Failed to load comments:', err);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const errorEl = form.querySelector('.comment-error');
        const successEl = form.querySelector('.comment-success');
        const submitBtn = form.querySelector('.comment-form-submit');

        // Reset messages
        errorEl.style.display = 'none';
        successEl.style.display = 'none';

        function showError(msg) {
            errorEl.textContent = msg;
            errorEl.style.display = 'block';
        }

        // Honeypot check
        const hp = form.querySelector('input[name="website"]');
        if (hp && hp.value) {
            // Silently reject — looks like a bot
            successEl.textContent = 'Your comment has been submitted.';
            successEl.style.display = 'block';
            form.reset();
            return;
        }

        // Timing check
        if (Date.now() - formOpenTime < MIN_SUBMIT_TIME) {
            showError('Please take a moment before submitting.');
            return;
        }

        // Extract values
        const authorName = form.querySelector('input[name="author_name"]').value.trim();
        const authorEmail = form.querySelector('input[name="author_email"]').value.trim();
        const body = form.querySelector('textarea[name="body"]').value.trim();
        const parentIdInput = form.querySelector('input[name="parent_id"]');
        const parentId = parentIdInput ? parentIdInput.value : null;

        // Validation
        if (!authorName || authorName.length < 1) {
            showError('Please enter your name.');
            return;
        }
        if (authorName.length > 80) {
            showError('Name is too long (max 80 characters).');
            return;
        }
        if (!body || body.length < 1) {
            showError('Please enter a comment.');
            return;
        }
        if (body.length > 5000) {
            showError('Comment is too long (max 5,000 characters).');
            return;
        }
        if (authorEmail && authorEmail.length > 254) {
            showError('Email is too long.');
            return;
        }

        // Profanity check
        if (typeof ProfanityFilter !== 'undefined') {
            const nameCheck = ProfanityFilter.check(authorName);
            const bodyCheck = ProfanityFilter.check(body);
            if (nameCheck.flagged || bodyCheck.flagged) {
                showError('Your comment contains language that is not allowed. Please revise and try again.');
                return;
            }
        }

        // Rate limit (client-side)
        if (!checkRateLimit()) {
            showError('You are posting too quickly. Please wait a few minutes.');
            return;
        }

        // Submit
        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting...';

        try {
            const payload = {
                post_slug: postSlug,
                author_name: authorName,
                body: body
            };
            if (parentId) payload.parent_id = parentId;
            if (authorEmail) payload.author_email = authorEmail;

            const { error } = await supabase
                .from('comments')
                .insert([payload]);

            if (error) throw error;

            recordRateLimit();

            // Success
            successEl.textContent = 'Comment posted successfully!';
            successEl.style.display = 'block';
            form.reset();

            // Remove reply form if this was a reply
            if (parentId) {
                const replyForm = form.closest('.comment-reply-form');
                if (replyForm) {
                    setTimeout(() => replyForm.remove(), 1500);
                }
            }

            // Reload comments
            await loadComments();

        } catch (err) {
            showError('Failed to post comment. Please try again.');
            console.error('Submit error:', err);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = parentId ? 'Post Reply' : 'Post Comment';
        }
    }

    // ===== Rate Limiting (localStorage) =====

    function checkRateLimit() {
        try {
            const timestamps = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
            const now = Date.now();
            const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
            return recent.length < RATE_LIMIT_MAX;
        } catch {
            return true;
        }
    }

    function recordRateLimit() {
        try {
            const timestamps = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
            const now = Date.now();
            const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
            recent.push(now);
            localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
        } catch {
            // localStorage unavailable — skip
        }
    }

    // ===== Helpers =====

    function getInitials(name) {
        if (!name) return '?';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) {
            // Single name: first char. Handle CJK: just first char.
            return parts[0].charAt(0);
        }
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0));
    }

    function relativeTime(dateStr) {
        const now = new Date();
        const date = new Date(dateStr);
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);

        if (diffSec < 60) return 'just now';
        if (diffMin < 60) return diffMin + (diffMin === 1 ? ' minute ago' : ' minutes ago');
        if (diffHr < 24) return diffHr + (diffHr === 1 ? ' hour ago' : ' hours ago');
        if (diffDay < 30) return diffDay + (diffDay === 1 ? ' day ago' : ' days ago');

        // Fall back to date string
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // ===== Boot =====

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
