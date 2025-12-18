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
      class: string,
      token: string
};

export type VoterName = string;

export type DetailVoteStatsType = {
      [CandidateName: string]: VoterName
}

export type VotesCount = number;

export type VoteStatsType = {
      [CandidateName: string]: VotesCount
};


export type VoterToken = string;

export type VoterTokenType = {
      [VoterName: string]: VoterToken
}