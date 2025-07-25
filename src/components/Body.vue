<script setup lang="ts">

const props = defineProps<{
    body: string
}>()

</script>


<template>
        <article>
            <div v-html="body"></div>
        </article>
</template>


<style>

h1 {
    font-size: 2rem;
    font-weight: 600;
}
h2 {
    font-size: 1.5rem;
    font-weight: 600;
}
h3, h4, h5, h6 {
    font-size: 1.25rem;
    font-weight: 600;
}

p {
    font-size: 1rem;
    line-height: 1.5;
}

a {
    font-weight: 600;
}

code {
    font-size: 0.875rem;
    font-weight: 600;
    background-color: var(--color-shadow);
    color: var(--color-highlight);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
}

ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

ol {
    list-style-type: decimal;
    margin-left: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

li {
    margin-bottom: 0.5rem;
}

/* Nested lists */
ul ul, ol ol, ul ol, ol ul {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

blockquote {
    border-left: 4px solid #E5E7EB;  /* gray-200 */
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin: 1.5rem 0;
    font-style: italic;
}

blockquote p {
    margin: 0.5rem 0;
}

blockquote cite {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #6B7280;  /* gray-500 */
}

</style>