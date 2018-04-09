

<template>

<b-container>
    <br/>
    <b-row>
        <b-col cols="8">
            <div class="box-stripe">
                <div class="box-stripe-heading">
                  <slot name="content-header"></slot>
                </div>
                <slot name="content"></slot>
            </div>
        </b-col>
        <b-col cols="4">
            <div class="box-stripe">
                <div class="box-stripe-heading">
                  <slot name="sidebar-header"></slot>
                </div>
            </div>
        </b-col>
    </b-row>
</b-container>

</template>

<script>

export default {
    name: 'SidebarLayout',
}

</script>
