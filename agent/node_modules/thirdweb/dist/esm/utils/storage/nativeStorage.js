import AsyncStorage from "@react-native-async-storage/async-storage";
export const nativeLocalStorage = {
    async getItem(key) {
        // @ts-ignore - default import buils but ts doesn't like it
        return AsyncStorage.getItem(key);
    },
    async removeItem(key) {
        // @ts-ignore - default import buils but ts doesn't like it
        await AsyncStorage.removeItem(key);
    },
    async setItem(key, value) {
        // @ts-ignore - default import buils but ts doesn't like it
        await AsyncStorage.setItem(key, value);
    },
};
//# sourceMappingURL=nativeStorage.js.map