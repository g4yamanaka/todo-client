<template>
  <div>
    <el-tabs
      type="border-card"
      style="width: 75%; margin: auto; user-select:none;-webkit-user-select: none;"
    >
      <el-tab-pane
        v-for="(tab, tab_index) in user_data.tabs"
        :key="tab_index"
        :label="tab.tab_name"
      >
        <el-row>
          <el-col>
            <el-button @click="deleteTask(tab_index)" type="danger" style="margin-left: 30px" plain>
              <fa :icon="faTrash"></fa>
            </el-button>
            <el-card
              class="box-card"
              style="margin: 30px auto;"
              v-for="(project, project_index) in tab.projects"
              :key="project_index"
            >
              <div slot="header" class="clearfix">
                <span>{{ project.project_name }}</span>
              </div>
              <el-form @submit.native.prevent="addTask(tab_index, project_index)">
                <el-input v-model="content" placeholder="Add task." clearable style="width: 70%"></el-input>
                <el-button type="success" native-type="submit" clearable>add</el-button>
              </el-form>
              <draggable
                ;
                element="ul"
                v-bind:options="{
                                animation: 200,
                                forceFallback:true,
                                delay: 50,
                                group: 'group1'}"
              >
                <div v-for="(task, task_index) in project.tasks" :key="task_index">
                  <li>
                    <fa :icon="faBars"></fa>
                    <span>{{ task.task_content }}</span>
                    <el-button
                      v-if="task.completed_flag"
                      @click="changeFlag(tab_index, project_index, task_index)"
                      type="success"
                      style="float: right; margin-right: 30%"
                      size="mini"
                    >
                      <fa :icon="faCheck"></fa>
                    </el-button>
                    <el-button
                      v-else
                      @click="changeFlag(tab_index, project_index, task_index)"
                      type="success"
                      style="float: right; margin-right: 30%"
                      size="mini"
                      plain
                    >
                      <fa :icon="faCheck"></fa>
                    </el-button>
                  </li>
                </div>
              </draggable>
            </el-card>
            <el-card>
              <el-form @submit.native.prevent="addProject(tab_index)">
                <el-input
                  v-model="add_project_name"
                  placeholder="Add Project name."
                  clearable
                  style="width: 70%"
                ></el-input>
                <el-button type="success" native-type="submit" clearable>add</el-button>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable no-console */

import draggable from "vuedraggable";
import fa from "vue-fa";
import { faCheck, faBars, faTrash } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "Todo",
  data() {
    return {
      faBars,
      faCheck,
      faTrash,
      content: "",
      user_data: {
        user_name: "g4yamanaka",
        tabs: [
          {
            tab_name: "GTD",
            projects: [
              {
                project_name: "inbox",
                tasks: []
              },
              {
                project_name: "後でやる",
                tasks: []
              }
            ]
          },
          {
            tab_name: "TODO",
            projects: [
              {
                project_name: "callender",
                tasks: [
                  {
                    task_content: "DBの勉強をする",
                    completed_flag: false
                  },
                  {
                    task_content: "Vueの勉強をする",
                    completed_flag: false
                  },
                  {
                    task_content: "spring bootの勉強をする",
                    completed_flag: false
                  },
                  {
                    task_content: "Hello World",
                    completed_flag: true
                  }
                ]
              }
            ]
          }
        ]
      },
      add_project_name: ""
    };
  },
  methods: {
    addTask: async function(tab_index, project_index) {
      if (this.content === "") {
        return;
      }
      this.user_data.tabs[tab_index].projects[project_index].tasks.push({
        task_content: this.content,
        completed_flag: false
      });
      this.content = "";
    },
    deleteTask: async function(tab_index) {
      this.user_data.tabs[tab_index].projects.forEach(project => {
        project.tasks.forEach((task, index) => {
          if (task.completed_flag === true) {
            project.tasks.splice(index, 1);
          }
        });
      });
    },
    addProject: async function(tab_index) {
      if (this.add_project_name === "") {
        return;
      }
      this.user_data.tabs[tab_index].projects.push({
        project_name: this.add_project_name,
        tasks: []
      });
      this.add_project_name = "";
    },
    changeFlag: async function(tab_index, project_index, task_index) {
      this.user_data.tabs[tab_index].projects[project_index].tasks[
        task_index
      ].completed_flag = this.user_data.tabs[tab_index].projects[project_index]
        .tasks[task_index].completed_flag
        ? false
        : true;
    },
    buttonTest: async function() {
      alert("Test Completed!");
    }
  },
  components: {
    draggable,
    fa
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
li {
  height: 2.5em;
  text-align: left;
  margin-left: 10%;
  background-color: white;
}
</style>

