import { ref } from 'vue';

export function useLazyCallback(callback) {
    const loading = ref(false);

    const error = ref(null);

    const data = ref(null);

    const execute = async (...args) => {
        loading.value = true;

        error.value = null;

        data.value = null;

        try {
            const response = await callback(...args);

            data.value = response;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return [
        execute,
        {
            loading,
            error,
            data,
        }
    ];
}
