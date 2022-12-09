"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenVestingAccountsCoder = void 0;
// @ts-nocheck
const B = __importStar(require("@native-to-anchor/buffer-layout"));
class TokenVestingAccountsCoder {
    constructor(_idl) { }
    async encode(accountName, account) {
        switch (accountName) {
            case "vesting": {
                const buffer = Buffer.alloc(657);
                const len = VESTING_LAYOUT.encode(account, buffer);
                return buffer.slice(0, len);
            }
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    decode(accountName, ix) {
        return this.decodeUnchecked(accountName, ix);
    }
    decodeUnchecked(accountName, ix) {
        switch (accountName) {
            case "vesting": {
                return decodeVestingAccount(ix);
            }
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    memcmp(accountName, _appendData) {
        switch (accountName) {
            case "vesting": {
                return {
                    dataSize: 657,
                };
            }
            default: {
                throw new Error(`Invalid account name: ${accountName}`);
            }
        }
    }
    size(idlAccount) {
        switch (idlAccount.name) {
            case "vesting": {
                return 657;
            }
            default: {
                throw new Error(`Invalid account name: ${idlAccount.name}`);
            }
        }
    }
}
exports.TokenVestingAccountsCoder = TokenVestingAccountsCoder;
function decodeVestingAccount(ix) {
    return VESTING_LAYOUT.decode(ix);
}
const VESTING_LAYOUT = B.struct([
    B.publicKey("destinationAddress"),
    B.publicKey("mintAddress"),
    B.bool("isInitialized"),
    B.seq(B.struct([B.u64("releaseTime"), B.u64("amount")]), 37, "schedule"),
]);
//# sourceMappingURL=accounts.js.map