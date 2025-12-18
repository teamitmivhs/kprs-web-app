<script lang="ts">
      import Chart from "chart.js/auto";
      import { useDetailedVotesStats, useDetailedVotesStatsEffect, useVotesStats } from "../../lib/hooks/useStats";
      import { onMount } from "svelte";

      let voteStatsCanvas: HTMLCanvasElement | null;
      let votedByVoterStatsCanvas: HTMLCanvasElement | null;
      
      let numOfVoters = $state<number>(50);

      onMount(() => {
            useDetailedVotesStatsEffect();
      });
            
      $effect(() => {
            if(!voteStatsCanvas || !votedByVoterStatsCanvas) return;
            
            let numOfVotes = Object.keys($useDetailedVotesStats).length;
            let chart1 = new Chart(voteStatsCanvas, {
                  type: "pie",
                  data: {
                        labels: $useVotesStats.map(voteData => voteData.candidate_name),
                        datasets: [
                              {
                                    data: $useVotesStats.map(voteData => voteData.vote_count),
                                    backgroundColor: ["#52ACFF", "#ACCC99"],
                              },
                        ],
                  },
                  options: {
                        plugins: {
                              legend: {
                                    labels: {
                                          color: "white",
                                    },
                              },
                        },
                  },
            });
            let chart2 = new Chart(votedByVoterStatsCanvas, {
                  type: "pie",
                  data: {
                        labels: ["Votes", "Not Voted"],
                        datasets: [
                              {
                                    data: [numOfVotes, numOfVoters-numOfVotes],
                                    backgroundColor: ["#0055FF", "#FF0055"],
                              },
                        ],
                  },
                  options: {
                        plugins: {
                              legend: {
                                    labels: {
                                          color: "white",
                                    },
                              },
                        },
                  },
            });

            return () => {
                  chart1.destroy();
                  chart2.destroy();
            }
      });
</script>

<div class="w-full h-full grid grid-cols-2 gap-4 items-center">
      <div class="flex flex-col items-center gap-4 w-full h-full p-12">
            <div class="w-1/2 aspect-square">
                  <canvas bind:this={voteStatsCanvas}></canvas>
            </div>
            <p class="w-full text-center text-xl font-semibold">Number of Voters</p>
      </div>
      <div class="flex flex-col items-center gap-4 w-full h-full p-12">
            <div class="w-1/2 aspect-square">
                  <canvas bind:this={votedByVoterStatsCanvas} id="candidatesChart"></canvas>
            </div>
            <p class="w-full text-center text-xl font-semibold">Number of Candidates</p>
      </div>
</div>
