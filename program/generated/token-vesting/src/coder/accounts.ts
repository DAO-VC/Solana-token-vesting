// @ts-nocheck
import * as B from "@native-to-anchor/buffer-layout";
import { AccountsCoder, Idl } from "@project-serum/anchor";
import { IdlTypeDef } from "@project-serum/anchor/dist/cjs/idl";

export class TokenVestingAccountsCoder<A extends string = string>
  implements AccountsCoder
{
  constructor(_idl: Idl) {}

  public async encode<T = any>(accountName: A, account: T): Promise<Buffer> {
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

  public decode<T = any>(accountName: A, ix: Buffer): T {
    return this.decodeUnchecked(accountName, ix);
  }

  public decodeUnchecked<T = any>(accountName: A, ix: Buffer): T {
    switch (accountName) {
      case "vesting": {
        return decodeVestingAccount(ix);
      }
      default: {
        throw new Error(`Invalid account name: ${accountName}`);
      }
    }
  }

  public memcmp(
    accountName: A,
    _appendData?: Buffer
  ): { dataSize?: number; offset?: number; bytes?: string } {
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

  public size(idlAccount: IdlTypeDef): number {
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

function decodeVestingAccount<T = any>(ix: Buffer): T {
  return VESTING_LAYOUT.decode(ix) as T;
}

const VESTING_LAYOUT: any = B.struct([
  B.publicKey("destinationAddress"),
  B.publicKey("mintAddress"),
  B.bool("isInitialized"),
  B.seq(B.struct([B.u64("releaseTime"), B.u64("amount")]), 37, "schedule"),
]);
