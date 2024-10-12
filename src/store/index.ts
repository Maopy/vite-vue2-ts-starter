/** Vuex Store */
import type {
  ActionContext,
  ActionTree,
  GetterTree,
  MutationTree,
  StoreOptions,
} from 'vuex'

import { createStore } from '@logue/vue2-helpers/vuex'

// TODO: State Interface
export interface RootState {
  exampleData?: any;
}

/** State */
const state: RootState = {
  exampleData: null,
}

/** Getters */
const getters: GetterTree<RootState, RootState> = {
  example: (s: RootState) => s.exampleData,
}

/** Mutation */
const mutations: MutationTree<RootState> = {
  exampleMutation (s: RootState, payload: any) {
    s.exampleData = payload
  },
}

/** Action */
const actions: ActionTree<RootState, RootState> = {
  /**
   * Example Action
   *
   * @param context - Vuex Context
   * @param data - Payload data
   */
  exampleAction (context: ActionContext<RootState, RootState>, data: any) {
    // ...
    context.commit('exampleMutation', data)
  },
}

/** VuexStore */
const store: StoreOptions<RootState> = {
  // https://next.vuex.vuejs.org/guide/strict.html#development-vs-production
  strict: import.meta.env.DEV,
  state,
  getters,
  mutations,
  actions,
  modules: {
    // SomeModule,
  },
  plugins: [
  ],
}

export default createStore(store)
