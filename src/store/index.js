import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
/* eslint-disable */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!',
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!',
      },
    ],
    personas: [],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    setLoadedPersonas(state, payload) {
      state.personas = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    createPersona(state, payload) {
      state.personas.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val()?data.val():[];
          Object.keys(obj).forEach((key) => {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId,
            });
          });
          commit('setLoadedMeetups', meetups);
          commit('setLoading', false);
        })
        .catch(
          (error) => {
            console.log(error);
            commit('setLoading', false);
          },
        );
    },
    loadPersonas({ commit }) {
      commit('setLoading', true);
      firebase.database().ref('personas').once('value')
        .then((data) => {
          const personas = [];
          const obj = data.val();
          Object.keys(obj).forEach((key) => {
            personas.push({
              id: key,
              nombre: obj[key].nombre,
              apellido: obj[key].apellido,
            });
          });
          console.log(personas);
          commit('setLoadedPersonas', personas);
          commit('setLoading', false);
        })
        .catch(
          (error) => {
            console.log(error);
            commit('setLoading', false);
          },
        );
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        nombre: payload.nombre,
        apellido: payload.apellido,
      };
      firebase.database().ref('personas').push(meetup)
        .then((data) => {
          const key = data.key;
          commit('createMeetup', {
            ...meetup,
            id: key,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    createPersona({ commit, getters }, payload) {
      console.log(payload);
      const meetup = {
        nombre: payload.nombre,
        apellido: payload.apellido,
      };
      firebase.database().ref('personas').push(meetup)
        .then((data) => {
          const key = data.key;
          commit('createPersona', {
            ...meetup,
            id: key,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            commit('setLoading', false);
            commit('setError', error);
            console.log(error);
          },
        );
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            commit('setLoading', false);
            commit('setError', error);
            console.log(error);
          },
        );
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [] });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        const ret = meetupA.date > meetupB.date;
        return ret;
      });
    },
    loadedPersonas(state) {
      return state.personas;
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        const ret = state.loadedMeetups.find(
          meetup => meetup.id === meetupId,
        );
        return ret;
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});
