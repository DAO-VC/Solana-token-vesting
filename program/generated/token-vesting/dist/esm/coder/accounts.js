// @ts-nocheck
import * as B from "@native-to-anchor/buffer-layout";
export class TokenVestingAccountsCoder {
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