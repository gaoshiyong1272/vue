<template>
    <el-container>
        <el-header>
            <sub-header></sub-header>
        </el-header>
        <el-container>
            <el-aside width="220px">
                <sub-aside></sub-aside>
            </el-aside>
            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "layout"
    }
</script>

<style scoped>

    .el-container {
        height: 100%
    }

    .el-aside {
        height: 100%
    }

    .el-main {
        padding: 0;
    }

    .el-header {
        padding: 0;
    }
</style>
