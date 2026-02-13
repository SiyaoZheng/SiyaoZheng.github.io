/**
 * Bilingual profanity filter (EN + CN)
 * Scunthorpe-safe: English uses \b word boundaries; Chinese uses 2+ char sequences.
 */
const ProfanityFilter = (() => {
    // English: word-boundary matching to avoid false positives
    const EN_WORDS = [
        'fuck', 'fucker', 'fucking', 'fucked', 'fucks',
        'shit', 'shitty', 'shitting', 'bullshit',
        'asshole', 'arsehole',
        'bitch', 'bitches',
        'bastard', 'bastards',
        'damn', 'damned', 'dammit',
        'cunt', 'cunts',
        'dick', 'dicks',
        'piss', 'pissed', 'pissing',
        'whore', 'whores',
        'slut', 'sluts',
        'cock', 'cocks',
        'nigger', 'nigga', 'niggers',
        'faggot', 'fag', 'faggots',
        'retard', 'retarded', 'retards',
        'stfu', 'gtfo', 'lmfao',
        'motherfucker', 'motherfucking',
        'dickhead', 'douchebag', 'dumbass',
        'jackass', 'dipshit', 'twat',
        'wanker', 'tosser', 'bellend',
        'kys', 'killyourself'
    ];

    // Chinese: 2+ character sequences to avoid single-char false positives
    const CN_PHRASES = [
        '他妈', '你妈', '操你', '草你', '日你', '干你',
        '妈逼', '傻逼', '煞笔', '沙比', '傻比',
        '牛逼', '装逼', '苦逼',
        '狗日', '王八蛋', '混蛋', '浑蛋',
        '贱人', '婊子', '荡妇', '臭婊',
        '脑残', '智障', '白痴', '废物',
        '去死', '找死', '该死', '他妈的',
        '滚蛋', '滚犊子',
        '尼玛', '泥马', '草泥马',
        '卧槽', '我靠', '我操',
        '狗屎', '放屁',
        '神经病', '变态',
        '垃圾', '人渣', '败类',
        '弱智', '低能',
        '妈的', '靠北', '干他'
    ];

    // Build English regex: whole-word matching, case-insensitive
    const enPattern = new RegExp(
        '\\b(' + EN_WORDS.join('|') + ')\\b', 'i'
    );

    /**
     * Check text for profanity.
     * @param {string} text
     * @returns {{ flagged: boolean, reason: string }}
     */
    function check(text) {
        if (!text || typeof text !== 'string') {
            return { flagged: false, reason: '' };
        }

        const lower = text.toLowerCase();

        // English check
        const enMatch = lower.match(enPattern);
        if (enMatch) {
            return { flagged: true, reason: 'en' };
        }

        // Chinese check: substring matching for multi-char sequences
        for (const phrase of CN_PHRASES) {
            if (text.includes(phrase)) {
                return { flagged: true, reason: 'cn' };
            }
        }

        return { flagged: false, reason: '' };
    }

    return { check };
})();
