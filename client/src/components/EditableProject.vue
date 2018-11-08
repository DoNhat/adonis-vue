<template>
    <v-layout row wrap>
        <v-flex xs9 class="text-xs-left">
            <span @click="$emit('onClick')" v-if="!isEditMode">{{title}}</span>
                        <v-text-field v-if="isEditMode"
                            :value="title"
                            autofocus
                            @keyup.enter="$emit('saveProject')"
                            @input="$emit('setProjectTitle', $event)">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-icon v-if="!isEditMode"
                            @click="$emit('setEditMode')">
                            edit
                        </v-icon>
                        <v-icon v-if="isEditMode"
                            @click="$emit('saveProject')">
                            check
                        </v-icon>
                        <v-icon v-if="isEditMode"
                            @click="$emit('unsetEditMode')">
                            close
                        </v-icon>
                        <v-icon v-if="!isEditMode"
                            @click="$emit('deleteProject')">
                            delete
            </v-icon>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: ['project', 'isEditMode', 'title'],
};
</script>

<style>
</style>
