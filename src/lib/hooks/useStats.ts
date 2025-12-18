import { writable } from "svelte/store";
import type { DetailVoteStatsType, VoteStatsType } from "../types";
import { api, ApiError } from "../api";
import { toasts } from "./useToast";


function createDetailedVotesStore() {
      const { subscribe, set, update  } = writable<DetailVoteStatsType>({
            "Ridwan Bagoes Setiawan": "Rasyad Rizky Ramadhan",
            "Aldi Fadlurrahman": "Andrea Farras"
      });

      return {
            subscribe,
            set,
            update
      }
}


export const useDetailedVotesStats = createDetailedVotesStore();

export async function useDetailedVotesStatsEffect() {
      const result = await api.getDetailedVotes();
      if(typeof result == "object") {
            useDetailedVotesStats.set(result);
      }
      else {
            toasts.showAPI(result);
            if(result === ApiError.Unauthorized) {
                  window.location.hash = "/admin";
            }
      }
}


function createVotesStore() {
      const { subscribe, set, update  } = writable<VoteStatsType>([
            {
                  candidate_name: "Rasyad Rizky Ramadhan",
                  vote_count: 20
            },
            {
                  candidate_name: "Andrea Farras",
                  vote_count: 30
            },
      ]);

      return {
            subscribe,
            set,
            update
      }
}


export const useVotesStats = createVotesStore();



