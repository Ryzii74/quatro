<template lang="jade">
    input(
        v-model="message",
        placeholder="Введите сообщение",
        @keyup.enter="submitForm"
    )
</template>

<script>
    module.exports = {
        data() {
            return { message: '' };
        },
        props: ['sendMessage'],
        methods: {
            submitForm() {
                this.sendMessage(this.message);
                this.message = '';
            },
        },
    };
</script>
