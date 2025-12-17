import type { Campus } from "./api";

export type CandidateType = {
      president: string;
      vice_president: string;
      visi: string;
      misi: string[];
      image: string;
      campus: Campus;
};

export type VoterType = {
      name: string;
      campus: Campus;
};

export type DetailVoteStatsType = {
      voter_name: string,
      candidate_name: string
}[]

export type VoteStatsType = {
      candidate_name: string;
      vote_count: number;
}[];