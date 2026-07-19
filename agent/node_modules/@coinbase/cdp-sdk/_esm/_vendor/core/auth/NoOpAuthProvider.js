export class NoOpAuthProvider {
    getAuthRequest() {
        return Promise.resolve({ headers: {} });
    }
}
//# sourceMappingURL=NoOpAuthProvider.js.map