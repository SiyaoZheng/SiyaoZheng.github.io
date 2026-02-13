-- =============================================
-- Supabase Setup for Blog Comment System
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- =============================================

-- 1. Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create comments table
CREATE TABLE comments (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_slug   TEXT NOT NULL,
    parent_id   UUID REFERENCES comments(id),
    author_name TEXT NOT NULL CHECK (char_length(author_name) BETWEEN 1 AND 80),
    author_email TEXT CHECK (author_email IS NULL OR char_length(author_email) <= 254),
    body        TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 5000),
    status      TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('approved', 'pending', 'rejected')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Indexes for performance
CREATE INDEX idx_comments_post_slug ON comments (post_slug, status, created_at);
CREATE INDEX idx_comments_parent_id ON comments (parent_id);

-- 4. Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read approved comments
CREATE POLICY "Anyone can read approved comments"
    ON comments FOR SELECT
    USING (status = 'approved');

-- Allow anyone to insert comments
CREATE POLICY "Anyone can insert comments"
    ON comments FOR INSERT
    WITH CHECK (
        status = 'approved'
        AND char_length(author_name) BETWEEN 1 AND 80
        AND char_length(body) BETWEEN 1 AND 5000
    );

-- Only authenticated (admin) users can update/delete
CREATE POLICY "Only admins can update comments"
    ON comments FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can delete comments"
    ON comments FOR DELETE
    USING (auth.role() = 'authenticated');

-- 5. Server-side profanity trigger
-- Flags comments containing common profanity as 'pending' for review
CREATE OR REPLACE FUNCTION check_comment_profanity()
RETURNS TRIGGER AS $$
DECLARE
    combined TEXT;
    en_pattern TEXT;
    cn_patterns TEXT[];
    p TEXT;
BEGIN
    combined := lower(NEW.author_name || ' ' || NEW.body);

    -- English profanity (word-boundary matching via regex)
    en_pattern := '\m(fuck|shit|asshole|bitch|bastard|cunt|nigger|nigga|faggot|retard|motherfucker|dickhead|douchebag|dumbass|twat|wanker)\M';
    IF combined ~* en_pattern THEN
        NEW.status := 'pending';
        RETURN NEW;
    END IF;

    -- Chinese profanity (substring matching for multi-char sequences)
    cn_patterns := ARRAY[
        '他妈', '你妈', '操你', '草你', '日你', '干你',
        '妈逼', '傻逼', '煞笔', '沙比', '傻比',
        '贱人', '婊子', '荡妇', '脑残', '智障',
        '去死', '找死', '该死', '滚蛋', '草泥马',
        '卧槽', '我操', '狗屎', '人渣', '败类', '弱智'
    ];

    FOREACH p IN ARRAY cn_patterns LOOP
        IF position(p IN NEW.body) > 0 OR position(p IN NEW.author_name) > 0 THEN
            NEW.status := 'pending';
            RETURN NEW;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_profanity
    BEFORE INSERT ON comments
    FOR EACH ROW
    EXECUTE FUNCTION check_comment_profanity();

-- 6. Rate limiting function (by IP, via Supabase edge function headers)
-- Note: Basic rate limiting is handled client-side via localStorage.
-- For server-side IP-based rate limiting, you would need a Supabase Edge Function.
-- The client-side approach is sufficient for an academic blog's traffic level.

-- =============================================
-- DONE! Your comment system is ready.
-- Now update comments.js with your Supabase URL and anon key.
-- =============================================
