import { writable } from "svelte/store";
import type { DetailVoteStatsType, VoterTokenType, VoteStatsType } from "../types";
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


function createSimpleVotesStore() {
      const { subscribe, set, update  } = writable<VoteStatsType>({
            "Rasyad Rizky Ramadhan": 20,
            "Andrea Farras": 30
      });

      return {
            subscribe,
            set,
            update
      }
}


export const useSimpleVotesStats = createSimpleVotesStore();

export async function useSimpleVotesStatsEffect() {
      const result = await api.getSimpleVotes();
      if(typeof result == "object") {
            useSimpleVotesStats.set(result);
      }
      else {
            toasts.showAPI(result);
            if(result === ApiError.Unauthorized) {
                  window.location.hash = "/admin";
            }
      }
}


function createNumOfVotersStore() {
      const { subscribe, set, update  } = writable<number>(0);

      return {
            subscribe,
            set,
            update
      }
}


export const useNumOfVoters = createNumOfVotersStore();


function createVoterTokenStore() {
      const { subscribe, set, update  } = writable<VoterTokenType>({});

      return {
            subscribe,
            set,
            update
      }
}


export const useVoterToken = createVoterTokenStore();

export async function useVoterTokenEffect() {
      const result = await api.getTokens();
      if(typeof result == "object") {
            let voter_token_result: VoterTokenType = {};

            Object.entries(result.static_voter_data).forEach(([voter_name, voter_data]) => {
                  voter_token_result[voter_name] = voter_data.token;
            });

            Object.entries(result.changed_voter_tokens).forEach(([voter_name, voter_token]) => {
                  voter_token_result[voter_name] = voter_token;
            });
            
            useVoterToken.set(voter_token_result);
            useNumOfVoters.set(Object.keys(voter_token_result).length);
      }
      else {
            toasts.showAPI(result);
            if(result === ApiError.Unauthorized) {
                  window.location.hash = "/admin";
            }
      }
}
