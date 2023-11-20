class PostNotExistError extends Error {
    constructor(message) {
        super(message);
        this.name = "PostNotExistError";
    }
}

class PostsNotExistError extends Error {
    constructor(message) {
        super(message);
        this.name = "PostsNotExistError";
    }
}

class CantSortError extends Error {
    constructor(message) {
        super(message);
        this.name = "CantSortError";
    }
}

class TokenTypeUnMatch extends Error {
    constructor(message) {
        super(message);
        this.name = "TokenTypeUnMatch";
    }
}

class TokenNotExistError extends Error {
    constructor(message) {
        super(message);
        this.name = "TokenNotExistError";
    }
}

class UserNotExistError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserNotExistError";
    }
}

// class ValidationError extends Error {
//     constructor(message) {
//         super(message);
//         this.name = "ValidationError";
//     }
// }

class NotUniqueValue extends Error {
    constructor(message) {
        super(message);
        this.name = "NotUniqueValue";
    }
}

class UsersInquiryError extends Error {
    constructor(message) {
        super(message);
        this.name = "UsersInquiryError";
    }
}

class NotMatchedIdError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotMatchedIdError";
    }
}

class NotMatchPWDError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotMatchPWDError";
    }
}

module.exports = {
    PostNotExistError,
    PostsNotExistError,
    CantSortError,
    TokenTypeUnMatch,
    TokenNotExistError,
    UserNotExistError,
    NotUniqueValue,
    UsersInquiryError,
    NotMatchedIdError,
    NotMatchPWDError,
};
