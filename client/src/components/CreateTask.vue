<template>
    <v-layout row wrap>
            <v-flex xs8>
                <v-text-field
                    placeholder="Task description..."
                    @input="$emit('onInput',$event)"
                    @keyup.enter="$emit('create')">
                </v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn color="green" class="mt-2" dark @click="$emit('create')">
                    <v-icon class="mr-2">add_circle</v-icon>
                    Create
                </v-btn>
            </v-flex>
        </v-layout>
</template>

<script>
export default {
  props: ['newTaskCompleted'],
};
</script>

<style>
</style>
