
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
    public setItem(key: string, value: any, isSerialization: boolean = false) {
        if (isSerialization) {
            // 序列化
            let data = JSON.stringify(value);
            localStorage.setItem(key, data);
        } else {
            localStorage.setItem(key, value);
        }
    }

    /**
     * 读取本地数据
     * @param key 
     * @param isSerialization 自动反序列化-json
     * @returns 
     */
    public getItem(key: string, isSerialization: boolean = false): any {
        if (isSerialization) {
            let item = localStorage.getItem(key);
            if (item) {
                // 反序列化
                let data = JSON.parse(item);
                return data;
            }
        } else {
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
    public removeItem(key: string) {
        localStorage.removeItem(key);
    }

    /**
     * 清除所有存储
     */
    public clearAll() {
        localStorage.clear();
    }

    /**
     * 获取本地存储项目长度
     * @returns 
     */
    public getItemCount(): number {
        return localStorage.length;
    }

}

const storageSystem = new StorageSystem();

interface INote {
    name: string;
    data: string;
    lateTime: string;
    createTime: string;
}

let notes: INote[] = [];
let editorNote: INote = undefined!;

function addNote() {
    let noteName = prompt("添加笔称", "笔记_" + (new Date().getTime()));

    if (noteName) {

        if (!getNote(noteName)) {
            let note: INote = {
                name: noteName,
                data: "创建于" + (new Date().toLocaleString()),
                lateTime: (new Date().toLocaleString()),
                createTime: (new Date().toLocaleString())
            };

            notes.push(note);

            updateNoteList();

            updateNoteData(note);
        } else {
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
        } else {
            alert("笔记不存在");
        }
    }
}

function updateNoteList() {

    let divNoteList = document.getElementById("note-list") as HTMLDivElement;
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

function getNote(noteName: string): INote {
    for (let note of notes) {
        if (note.name == noteName) {
            return note;
        }
    }

    return undefined!;
}

function updateNoteData(note: INote) {
    editorNote = note;

    let editboxNoteData = document.getElementById("editbox-note-data") as HTMLInputElement;
    editboxNoteData.value = note.data;

    let editorNoteName = document.getElementById("editor-note-name") as HTMLTextAreaElement;
    editorNoteName.innerHTML = "名称:" + editorNote.name;

    let editorNoteLateTime = document.getElementById("editor-note-lateTime") as HTMLTextAreaElement;
    editorNoteLateTime.innerHTML = "上次打开时间:" + editorNote.lateTime;

    let editorNoteCreateTime = document.getElementById("editor-note-createTime") as HTMLTextAreaElement;
    editorNoteCreateTime.innerHTML = "创建时间:" + editorNote.createTime;
}

function saveNote() {
    let editboxNoteData = document.getElementById("editbox-note-data") as HTMLInputElement;

    editorNote.data = editboxNoteData.value;
    editorNote.lateTime = (new Date().toLocaleString());
}
