<template>
    <v-layout row wrap>
        <v-flex xs9 class="text-xs-left">
            <slot></slot>
            <span v-if="!isEditMode">{{title}}</span>
                        <v-text-field v-if="isEditMode"
                            :value="title"
                            autofocus
                            @keyup.enter="$emit('saveTask')"
                            @input="$emit('setTaskTitle', $event)">
                        </v-text-field>
        </v-flex>
                    <v-flex xs3>
                        <v-icon v-if="!isEditMode"
                            @click="$emit('setEditMode')">
                            edit
                        </v-icon>
                        <v-icon v-if="isEditMode"
                            @click="$emit('saveTask')">
                            check
                        </v-icon>
                        <v-icon v-if="isEditMode"
                            @click="$emit('unsetEditMode')">
                            close
                        </v-icon>
                        <v-icon v-if="!isEditMode"
                            @click="$emit('deleteTask')">
                            delete
            </v-icon>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: ['isEditMode', 'title', 'isComplete'],
};
</script>

<style>
</style>
