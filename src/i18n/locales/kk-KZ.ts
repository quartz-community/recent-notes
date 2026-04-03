export default {
  components: {
    recentNotes: {
      title: "Соңғы жазбалар",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
