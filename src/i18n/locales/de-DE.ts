export default {
  components: {
    recentNotes: {
      title: "Zuletzt bearbeitete Seiten",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};
