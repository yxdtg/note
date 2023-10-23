"use strict";
/**
 * 存储系统
 * 用于存储 读取 游戏数据
 * YuxEngine
 */
class StorageSystem {
    /**
     * 存储本地数据
     * @param key
     * @param value
     * @param isSerialization 自动序列化-json
     */
    setItem(key, value, isSerialization = false) {
        if (isSerialization) {
            // 序列化
            let data = JSON.stringify(value);
            localStorage.setItem(key, data);
        }
        else {
            localStorage.setItem(key, value);
        }
    }
    /**
     * 读取本地数据
     * @param key
     * @param isSerialization 自动反序列化-json
     * @returns
     */
    getItem(key, isSerialization = false) {
        if (isSerialization) {
            let item = localStorage.getItem(key);
            if (item) {
                // 反序列化
                let data = JSON.parse(item);
                return data;
            }
        }
        else {
            let item = localStorage.getItem(key);
            if (item) {
                return item;
            }
        }
    }
    /**
     * 移除本地存储
     * @param key
     */
    removeItem(key) {
        localStorage.removeItem(key);
    }
    /**
     * 清除所有存储
     */
    clearAll() {
        localStorage.clear();
    }
    /**
     * 获取本地存储项目长度
     * @returns
     */
    getItemCount() {
        return localStorage.length;
    }
}
const storageSystem = new StorageSystem();
let notes = [];
let editorNote = undefined;
function addNote() {
    let noteName = prompt("添加笔称", "笔记_" + (new Date().getTime()));
    if (noteName) {
        if (!getNote(noteName)) {
            let note = {
                name: noteName,
                data: "创建于" + (new Date().toLocaleString()),
                lateTime: (new Date().toLocaleString()),
                createTime: (new Date().toLocaleString())
            };
            notes.push(note);
            updateNoteList();
            updateNoteData(note);
        }
        else {
            alert("笔记重复");
        }
    }
}
function removeNote() {
    let noteName = prompt("移除笔记", "");
    if (noteName) {
        let note = getNote(noteName);
        if (note) {
            notes.splice(notes.indexOf(note), 1);
            updateNoteList();
        }
        else {
            alert("笔记不存在");
        }
    }
}
function updateNoteList() {
    let divNoteList = document.getElementById("note-list");
    for (let i = divNoteList.children.length - 1; i > -1; i--) {
        let divNote = divNoteList.children[i];
        divNoteList.removeChild(divNote);
    }
    for (let note of notes) {
        let divNote = document.createElement("div");
        divNote.innerText = note.name;
        divNoteList.appendChild(divNote);
        divNote.onclick = () => {
            updateNoteData(note);
        };
    }
}
function getNote(noteName) {
    for (let note of notes) {
        if (note.name == noteName) {
            return note;
        }
    }
    return undefined;
}
function updateNoteData(note) {
    editorNote = note;
    let editboxNoteData = document.getElementById("editbox-note-data");
    editboxNoteData.value = note.data;
    let editorNoteName = document.getElementById("editor-note-name");
    editorNoteName.innerHTML = "名称:" + editorNote.name;
    let editorNoteLateTime = document.getElementById("editor-note-lateTime");
    editorNoteLateTime.innerHTML = "上次打开时间:" + editorNote.lateTime;
    let editorNoteCreateTime = document.getElementById("editor-note-createTime");
    editorNoteCreateTime.innerHTML = "创建时间:" + editorNote.createTime;
}
function saveNote() {
    let editboxNoteData = document.getElementById("editbox-note-data");
    editorNote.data = editboxNoteData.value;
    editorNote.lateTime = (new Date().toLocaleString());
}
