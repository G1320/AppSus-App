// import { noteService } from '../services/note.service.js';
// import noteInfoPreview from './NoteInfoPreview.js';
// import { utilService } from '../services/util.service.js';
// import { eventBusService } from '../services/event-bus.service.js';

// export default {
//   template: `
//   <div v-if="note">
//   <h2>Note:</h2>
//             <ul class="clean-list">
//                 <li v-for="noteInfo in note.noteInfos" :key="noteInfo.id">
//                     <button class="btn-remove" @click="removeNote(noteInfo.id)">🗑</button>
//                     <noteInfoPreview :noteInfo="noteInfo"/>
//                 </li>
//             </ul>
// </div>
// <section class="add-noteInfo">
//   <h3>Add Note</h3>
//   <button class="noteInfo-add-btn" @click="toggleModal" aria-label="add noteInfo" title="Add Note">+</button>
//   <div id="modal" role="dialog" aria-modal="true" aria-labelledby="add-noteInfo-header" v-if="showModal">
//     <button class="close-btn" @click="toggleModal" aria-label="close" title="Close">x</button>
//     <div id="noteInfo-form-container">
//       <h2 id="add-noteInfo-header">Add noteInfo</h2>
//       <form id="noteInfo-form" @submit.prevent="saveNoteInfo">
//         <div class="fieldset">
//           <label for="noteInfo-name">Full name</label>
//           <input name="noteInfo-name" id="noteInfo-name" v-model="noteInfo.name" required="">
//         </div>
//         <div class="fieldset">
//           <label>Rating</label>
//           <div class="rate">
//             <input type="radio" id="star5" name="rate" v-model="noteInfo.rate" value="5" required="">
//             <label for="star5" title="5 stars">5 stars</label>
//             <input type="radio" id="star4" name="rate" v-model="noteInfo.rate" value="4">
//             <label for="star4" title="4 stars">4 stars</label>
//            <input type="radio" id="star3" name="rate" v-model="noteInfo.rate" value="3">
//             <label for="star3" title="3 stars">3 stars</label>
//             <input type="radio" id="star2" name="rate" v-model="noteInfo.rate" value="2">
//             <label for="star2" title="2 stars">2 stars</label>
//             <input type="radio" id="star1" name="rate" v-model="noteInfo.rate" value="1">
//             <label for="star1" title="1 star">1 star</label>
//           </div>
//         </div>

//         <div class="fieldset">
//           <label for="noteInfo-read-at">Read at:</label>
//           <input type="date" name="noteInfo-read-at" id="noteInfo-read-at" v-model="noteInfo.readAt" required=""/>
//         </div>
//         <div class="fieldset right">
//           <button id="submit-noteInfo-btn">Save</button>
//         </div>
//       </form>
//     </div>
//   </div>
//   <div class="modal-overlay" v-if="showModal"></div>
// </section>`,

//   data() {
//     return {
//       note: null,
//       showModal: false,
//       noteInfo: {},
//     };
//   },
//   methods: {
//     toggleModal() {
//       this.showModal = !this.showModal;
//     },
//     // saveNoteInfo() {
//     //   this.$emit('savenoteInfo', this.review)
//     //   this.toggleModal()
//     //   this.review = {}
//     // },
//     removeNoteInfo(noteInfoId) {
//       noteService.removeNoteInfo(this.note.id, noteInfoId).then((note) => {
//         eventBusService.emit('show-msg', { txt: 'Note added', type: 'success' });
//         this.note = note;
//       });
//     },

//     saveNoteInfo() {
//       noteService
//         .addNoteInfo(this.note.id, this.noteInfo)
//         .then((savedNote) => {
//           eventBusService.emit('show-msg', { txt: 'Note', type: 'success' });
//           this.note = savedNote;
//         })
//         .catch((err) => {
//           eventBusService.emit('show-msg', { txt: 'failed to add noteInfo', type: 'error' });
//         });
//     },
//   },
//   created() {
//     const { noteId } = this.$route.params;
//     if (noteId) {
//       noteService.get(noteId).then((note) => {
//         this.note = note;
//         if (note.noteInfos) this.noteInfos = note.noteInfos;
//       });
//     }
//   },
//   components: {
//     noteInfoPreview,
//   },
//   emits: [],
// };
