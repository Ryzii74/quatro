<template lang="jade">
    p {{login}}: {{text}}
</template>

<script>
    module.exports = {
        props: ['login', 'text'],
    };
</script>
