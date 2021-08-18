<template>
  <div :class="{ editing: isEdited }">
    <!-- <input type="checkbox" class="box" v-model="todo.complete" /> -->
    <div class="todoitem" @dblclick="editTodo()">
      <!-- <input
        type="checkbox"
        class="box"
        @change="toggletodo($event.target.checked)"
        :checked="complete"
      /> -->
      <input
        type="checkbox"
        class="box"
        @change="toggletodo()"
        :checked="complete"
      />
      <span>{{ text }}</span
      ><a href="javascript:;" @click="removeTodo()"></a>
    </div>
    <!-- input的value 和editedtodo是双向绑定的 -->
    <input
      v-if="isEdited"
      type="text"
      class="edit"
      v-model="editingTitle"
      @blur="doneEdit()"
      @keyup.enter="doneEdit()"
      @keyup.esc="cancelEdit()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdited: false, // 是否在编辑中中状态
      editingTitle: "", // 编辑中内容
    };
  },
  // 父传子
  props: {
    // 备忘内容
    text: {
      type: String,
      default: "",
    },
    // 备忘勾选（已完成）状态
    complete: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 编辑备忘
    editTodo() {
      this.editingTitle = this.text;
      this.isEdited = true;
    },
    // 确认修改备忘
    doneEdit() {
      // ESC 按键也会触发 blur 事件，故需要判断原有状态是否是编辑中
      if (this.isEdited) {
        // 更新绑定的 title
        this.$emit("eventedit", this.editingTitle);

        this.isEdited = false;
      }
    },
    // 取消修改备忘
    cancelEdit() {
      // 取消编辑中状态
      this.isEdited = false;
    },
    // 更新选中状态
    toggletodo() {
      // 更新绑定的 completed
      // this.$emit("update:complete", complete);
      this.$emit("eventtoggle");
    },
    // 删除备忘
    removeTodo() {
      // 通知父组件删除
      this.$emit("delete");
    },
  },
};
</script>

<style>
li.completed .todoitem {
  display: block;
}
li.completed .edit {
  display: none;
}
li.completed .editing .todoitem {
  display: none;
}

li.completed .editing .edit {
  display: block;
}
</style>