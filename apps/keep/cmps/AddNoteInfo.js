import { noteService } from '../services/note.service.js';
import ReviewPreview from './NoteInfoPreview.js';
import { utilService } from '../services/util.service.js';
import { eventBusService } from '../services/event-bus.service.js';

export default {
  template: `
  <div v-if="note">
  <h2>Reviews:</h2>
            <ul class="clean-list">
                <li v-for="review in note.reviews" :key="review.id">
                    <button class="btn-remove" @click="removeReview(review.id)">🗑</button>
                    <ReviewPreview :review="review"/>
                </li>
            </ul>
</div>
<section class="add-review">
  <h3>Add Review</h3>
  <button class="review-add-btn" @click="toggleModal" aria-label="add review" title="Add Review">+</button>
  <div id="modal" role="dialog" aria-modal="true" aria-labelledby="add-review-header" v-if="showModal">
    <button class="close-btn" @click="toggleModal" aria-label="close" title="Close">x</button>
    <div id="review-form-container">
      <h2 id="add-review-header">Add Review</h2>
      <form id="review-form" @submit.prevent="saveReview">
        <div class="fieldset">
          <label for="review-name">Full name</label>
          <input name="review-name" id="review-name" v-model="review.name" required="">
        </div>
        <div class="fieldset">
          <label>Rating</label>
          <div class="rate">
            <input type="radio" id="star5" name="rate" v-model="review.rate" value="5" required="">
            <label for="star5" title="5 stars">5 stars</label>
            <input type="radio" id="star4" name="rate" v-model="review.rate" value="4">
            <label for="star4" title="4 stars">4 stars</label>
           <input type="radio" id="star3" name="rate" v-model="review.rate" value="3">
            <label for="star3" title="3 stars">3 stars</label>
            <input type="radio" id="star2" name="rate" v-model="review.rate" value="2">
            <label for="star2" title="2 stars">2 stars</label>
            <input type="radio" id="star1" name="rate" v-model="review.rate" value="1">
            <label for="star1" title="1 star">1 star</label>
          </div>
        </div>

        <div class="fieldset">
          <label for="review-read-at">Read at:</label>
          <input type="date" name="review-read-at" id="review-read-at" v-model="review.readAt" required=""/>
        </div>
        <div class="fieldset right">
          <button id="submit-review-btn">Save</button>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-overlay" v-if="showModal"></div>
</section>`,

  data() {
    return {
      note: null,
      showModal: false,
      review: {},
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    // saveReview() {
    //   this.$emit('saveReview', this.review)
    //   this.toggleModal()
    //   this.review = {}
    // },
    removeReview(reviewId) {
      noteService.removeReview(this.note.id, reviewId).then((note) => {
        eventBusService.emit('show-msg', { txt: 'Review added', type: 'success' });
        this.note = note;
      });
    },

    saveReview() {
      noteService
        .addReview(this.note.id, this.review)
        .then((savedNote) => {
          eventBusService.emit('show-msg', { txt: 'Review added', type: 'success' });
          this.note = savedNote;
        })
        .catch((err) => {
          eventBusService.emit('show-msg', { txt: 'failed to add review', type: 'error' });
        });
    },
  },
  created() {
    const { noteId } = this.$route.params;
    if (noteId) {
      noteService.get(noteId).then((note) => {
        this.note = note;
        if (note.reviews) this.reviews = note.reviews;
      });
    }
  },
  components: {
    ReviewPreview,
  },
  emits: [],
};
