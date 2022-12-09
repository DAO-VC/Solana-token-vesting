import { PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
interface GetProgramParams {
    programId?: PublicKey;
    provider?: AnchorProvider;
}
export declare function tokenVestingProgram(params?: GetProgramParams): Program<TokenVesting>;
declare type TokenVesting = {
    version: "0.1.0";
    name: "token_vesting";
    instructions: [
        {
            name: "init";
            accounts: [
                {
                    name: "systemProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "rentProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "payer";
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: "vestingAccount";
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "seeds";
                    type: {
                        array: ["u8", 32];
                    };
                },
                {
                    name: "numberOfSchedules";
                    type: "u32";
                }
            ];
        },
        {
            name: "create";
            accounts: [
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "vestingAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "vestingTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "sourceTokenAccountOwner";
                    isMut: false;
                    isSigner: true;
                },
                {
                    name: "sourceTokenAccount";
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "seeds";
                    type: {
                        array: ["u8", 32];
                    };
                },
                {
                    name: "mintAddress";
                    type: "publicKey";
                },
                {
                    name: "destinationTokenAddress";
                    type: "publicKey";
                },
                {
                    name: "schedules";
                    type: {
                        array: [
                            {
                                defined: "Schedule";
                            },
                            37
                        ];
                    };
                }
            ];
        },
        {
            name: "unlock";
            accounts: [
                {
                    name: "tokenProgram";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "clock";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "vestingAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "vestingTokenAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "destinationTokenAccount";
                    isMut: true;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "seeds";
                    type: {
                        array: ["u8", 32];
                    };
                }
            ];
        },
        {
            name: "changeDestination";
            accounts: [
                {
                    name: "vestingAccount";
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: "currentDestinationTokenAccount";
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: "currentDestinationTokenAccountOwner";
                    isMut: false;
                    isSigner: true;
                },
                {
                    name: "targetDestinationTokenAccount";
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: "seeds";
                    type: {
                        array: ["u8", 32];
                    };
                }
            ];
        }
    ];
    accounts: [
        {
            name: "vesting";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "destinationAddress";
                        type: "publicKey";
                    },
                    {
                        name: "mintAddress";
                        type: "publicKey";
                    },
                    {
                        name: "isInitialized";
                        type: "bool";
                    },
                    {
                        name: "schedule";
                        type: {
                            array: [
                                {
                                    defined: "Schedule";
                                },
                                37
                            ];
                        };
                    }
                ];
            };
        }
    ];
    types: [
        {
            name: "Schedule";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "releaseTime";
                        type: "u64";
                    },
                    {
                        name: "amount";
                        type: "u64";
                    }
                ];
            };
        }
    ];
    errors: [
        {
            code: 0;
            name: "InvalidInstruction";
            msg: "Invalid Instruction";
        }
    ];
};
export {};
//# sourceMappingURL=program.d.ts.map