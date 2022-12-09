"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVestingProgram = void 0;
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@project-serum/anchor");
const coder_1 = require("./coder");
const TOKEN_VESTING_PROGRAM_ID = web3_js_1.PublicKey.default;
function tokenVestingProgram(params) {
    var _a;
    return new anchor_1.Program(IDL, (_a = params === null || params === void 0 ? void 0 : params.programId) !== null && _a !== void 0 ? _a : TOKEN_VESTING_PROGRAM_ID, params === null || params === void 0 ? void 0 : params.provider, new coder_1.TokenVestingCoder(IDL));
}
exports.tokenVestingProgram = tokenVestingProgram;
const IDL = {
    version: "0.1.0",
    name: "token_vesting",
    instructions: [
        {
            name: "init",
            accounts: [
                {
                    name: "systemProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "rentProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "payer",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "vestingAccount",
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "seeds",
                    type: {
                        array: ["u8", 32],
                    },
                },
                {
                    name: "numberOfSchedules",
                    type: "u32",
                },
            ],
        },
        {
            name: "create",
            accounts: [
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "vestingAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "vestingTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "sourceTokenAccountOwner",
                    isMut: false,
                    isSigner: true,
                },
                {
                    name: "sourceTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "seeds",
                    type: {
                        array: ["u8", 32],
                    },
                },
                {
                    name: "mintAddress",
                    type: "publicKey",
                },
                {
                    name: "destinationTokenAddress",
                    type: "publicKey",
                },
                {
                    name: "schedules",
                    type: {
                        array: [
                            {
                                defined: "Schedule",
                            },
                            37,
                        ],
                    },
                },
            ],
        },
        {
            name: "unlock",
            accounts: [
                {
                    name: "tokenProgram",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "clock",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "vestingAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "vestingTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "destinationTokenAccount",
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "seeds",
                    type: {
                        array: ["u8", 32],
                    },
                },
            ],
        },
        {
            name: "changeDestination",
            accounts: [
                {
                    name: "vestingAccount",
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: "currentDestinationTokenAccount",
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: "currentDestinationTokenAccountOwner",
                    isMut: false,
                    isSigner: true,
                },
                {
                    name: "targetDestinationTokenAccount",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "seeds",
                    type: {
                        array: ["u8", 32],
                    },
                },
            ],
        },
    ],
    accounts: [
        {
            name: "vesting",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "destinationAddress",
                        type: "publicKey",
                    },
                    {
                        name: "mintAddress",
                        type: "publicKey",
                    },
                    {
                        name: "isInitialized",
                        type: "bool",
                    },
                    {
                        name: "schedule",
                        type: {
                            array: [
                                {
                                    defined: "Schedule",
                                },
                                37,
                            ],
                        },
                    },
                ],
            },
        },
    ],
    types: [
        {
            name: "Schedule",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "releaseTime",
                        type: "u64",
                    },
                    {
                        name: "amount",
                        type: "u64",
                    },
                ],
            },
        },
    ],
    errors: [
        {
            code: 0,
            name: "InvalidInstruction",
            msg: "Invalid Instruction",
        },
    ],
};
//# sourceMappingURL=program.js.map