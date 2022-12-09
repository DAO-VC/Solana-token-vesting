// @ts-nocheck
import * as B from "@native-to-anchor/buffer-layout";
import { Idl, InstructionCoder } from "@project-serum/anchor";

export class TokenVestingInstructionCoder implements InstructionCoder {
  constructor(_idl: Idl) {}

  encode(ixName: string, ix: any): Buffer {
    switch (ixName) {
      case "init": {
        return encodeInit(ix);
      }
      case "create": {
        return encodeCreate(ix);
      }
      case "unlock": {
        return encodeUnlock(ix);
      }
      case "changeDestination": {
        return encodeChangeDestination(ix);
      }

      default: {
        throw new Error(`Invalid instruction: ${ixName}`);
      }
    }
  }

  encodeState(_ixName: string, _ix: any): Buffer {
    throw new Error("TokenVesting does not have state");
  }
}

function encodeInit({ seeds, numberOfSchedules }: any): Buffer {
  return encodeData({ init: { seeds, numberOfSchedules } }, 1 + 1 * 32 + 4);
}

function encodeCreate({
  seeds,
  mintAddress,
  destinationTokenAddress,
  schedules,
}: any): Buffer {
  return encodeData(
    { create: { seeds, mintAddress, destinationTokenAddress, schedules } },
    1 + 1 * 32 + 32 + 32 + 16 * 37
  );
}

function encodeUnlock({ seeds }: any): Buffer {
  return encodeData({ unlock: { seeds } }, 1 + 1 * 32);
}

function encodeChangeDestination({ seeds }: any): Buffer {
  return encodeData({ changeDestination: { seeds } }, 1 + 1 * 32);
}

const LAYOUT = B.union(B.u8("instruction"));
LAYOUT.addVariant(
  0,
  B.struct([B.seq(B.u8(), 32, "seeds"), B.u32("numberOfSchedules")]),
  "init"
);
LAYOUT.addVariant(
  1,
  B.struct([
    B.seq(B.u8(), 32, "seeds"),
    B.publicKey("mintAddress"),
    B.publicKey("destinationTokenAddress"),
    B.seq(B.struct([B.u64("releaseTime"), B.u64("amount")]), 37, "schedules"),
  ]),
  "create"
);
LAYOUT.addVariant(2, B.struct([B.seq(B.u8(), 32, "seeds")]), "unlock");
LAYOUT.addVariant(
  3,
  B.struct([B.seq(B.u8(), 32, "seeds")]),
  "changeDestination"
);

function encodeData(ix: any, span: number): Buffer {
  const b = Buffer.alloc(span);
  LAYOUT.encode(ix, b);
  return b;
}
