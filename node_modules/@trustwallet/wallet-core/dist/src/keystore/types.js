"use strict";
// SPDX-License-Identifier: Apache-2.0
//
// Copyright © 2017 Trust Wallet.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = exports.WalletType = void 0;
var WalletType;
(function (WalletType) {
    WalletType["Mnemonic"] = "mnemonic";
    WalletType["PrivateKey"] = "privateKey";
    WalletType["WatchOnly"] = "watchOnly";
    WalletType["Hardware"] = "hardware";
})(WalletType = exports.WalletType || (exports.WalletType = {}));
var Error;
(function (Error) {
    Error["WalletNotFound"] = "wallet not found";
    Error["AccountNotFound"] = "account not found";
    Error["InvalidPassword"] = "invalid password";
    Error["InvalidMnemonic"] = "invalid mnemonic";
    Error["InvalidJSON"] = "invalid JSON";
    Error["InvalidKey"] = "invalid key";
})(Error = exports.Error || (exports.Error = {}));
