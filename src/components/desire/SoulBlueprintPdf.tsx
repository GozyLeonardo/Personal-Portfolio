import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Circle,
} from "@react-pdf/renderer";
import type { SoulBlueprint } from "@/lib/desire/types";

/* Light-theme brand tokens (white Soul Blueprint). Mirror of globals.css,
   re-mapped for a white canvas. */

const BG = "#FFFFFF";
const INK = "#171510";
const MUTED = "#6B675F";
const GOLD = "#B26A00";
const TEAL = "#008F80";
const LINE = "#EAE4D9";
const PANEL = "#F7F3EA";

const styles = StyleSheet.create({
  page: {
    backgroundColor: BG,
    color: INK,
    fontFamily: "Inter",
    paddingVertical: 48,
    paddingHorizontal: 56,
    fontSize: 10.5,
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 24,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  mark: {
    marginRight: 12,
  },
  brandText: {
    fontFamily: "IBM Plex Mono",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: 3,
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  brandSub: {
    fontFamily: "IBM Plex Mono",
    fontSize: 7.5,
    letterSpacing: 1.5,
    color: MUTED,
  },
  title: {
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    fontSize: 30,
    color: INK,
    marginBottom: 8,
    lineHeight: 1.05,
  },
  essence: {
    fontFamily: "Space Grotesk",
    fontSize: 13,
    color: GOLD,
    lineHeight: 1.5,
  },
  rule: {
    height: 1,
    backgroundColor: LINE,
    marginVertical: 18,
  },
  goldRule: {
    height: 2,
    backgroundColor: GOLD,
    width: 44,
    marginTop: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  sectionNum: {
    fontFamily: "IBM Plex Mono",
    fontWeight: 500,
    fontSize: 9,
    color: GOLD,
    width: 26,
  },
  sectionLabel: {
    fontFamily: "IBM Plex Mono",
    fontWeight: 500,
    fontSize: 8.5,
    letterSpacing: 1.5,
    color: TEAL,
    textTransform: "uppercase",
  },
  body: {
    color: INK,
    fontSize: 10.5,
  },
  muted: {
    color: MUTED,
    fontSize: 10,
  },
  highlight: {
    backgroundColor: PANEL,
    borderLeftWidth: 2,
    borderLeftColor: GOLD,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  highlightText: {
    color: INK,
    fontSize: 10.5,
  },
  subLabel: {
    fontFamily: "IBM Plex Mono",
    fontSize: 7.5,
    letterSpacing: 1,
    color: MUTED,
    textTransform: "uppercase",
    marginTop: 6,
    marginBottom: 2,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  chip: {
    fontFamily: "Space Grotesk",
    fontSize: 10,
    color: INK,
    backgroundColor: PANEL,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  twoCol: {
    flexDirection: "row",
    marginTop: 4,
  },
  col: {
    flex: 1,
    paddingRight: 12,
  },
  colHead: {
    fontFamily: "IBM Plex Mono",
    fontSize: 7.5,
    letterSpacing: 1,
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    color: GOLD,
    width: 12,
  },
  belief: {
    flexDirection: "row",
    marginBottom: 6,
  },
  beliefOld: {
    color: MUTED,
    flex: 1,
    paddingRight: 10,
  },
  beliefNew: {
    color: INK,
    flex: 1,
  },
  arrow: {
    color: GOLD,
    width: 14,
  },
  dreamItem: {
    marginBottom: 6,
  },
  dreamLabel: {
    fontFamily: "IBM Plex Mono",
    fontSize: 7.5,
    letterSpacing: 1,
    color: TEAL,
    textTransform: "uppercase",
  },
  covenant: {
    borderWidth: 1.5,
    borderColor: GOLD,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  covenantHead: {
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    fontSize: 13,
    color: GOLD,
    marginBottom: 8,
  },
  signatureRow: {
    flexDirection: "row",
    marginTop: 22,
  },
  signatureBox: {
    flex: 1,
    marginRight: 24,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: MUTED,
    marginTop: 26,
    paddingTop: 4,
  },
  signatureLabel: {
    fontFamily: "IBM Plex Mono",
    fontSize: 7.5,
    color: MUTED,
    textTransform: "uppercase",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 56,
    right: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 8,
  },
  footerText: {
    fontFamily: "IBM Plex Mono",
    fontSize: 7,
    color: MUTED,
  },
});

function clip(value: string, max: number): string {
  if (!value) return "";
  return value.length > max ? value.slice(0, max - 1).trim() + "…" : value;
}

function OrbitalMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" style={styles.mark}>
      <Circle cx={100} cy={100} r={88} fill="none" stroke={LINE} strokeWidth={1.5} />
      <Circle cx={100} cy={12} r={4} fill={GOLD} />
      <Circle cx={100} cy={100} r={62} fill="none" stroke={LINE} strokeWidth={1.5} />
      <Circle cx={45} cy={122} r={3} fill={TEAL} />
      <Circle cx={100} cy={100} r={14} fill={BG} stroke={GOLD} strokeWidth={2} />
      <Circle cx={100} cy={100} r={3} fill={GOLD} />
    </Svg>
  );
}

function Section({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionNum}>{num}</Text>
        <Text style={styles.sectionLabel}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <View style={styles.highlight}>{children}</View>;
}

function Footer({ page, total }: { page: number; total: number }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>The Signal Technologies · Alchemy of Desire</Text>
      <Text style={styles.footerText}>
        {page} / {total}
      </Text>
    </View>
  );
}

export function SoulBlueprintPdf({ data }: { data: SoulBlueprint }) {
  const d = data;
  const hasCompass = d.admires || d.judges || d.envies;
  const hasValues = d.authenticValues.length > 0 || d.inheritedValues.length > 0;
  const hasDream = Object.values(d.dreamLife).some(Boolean);
  const hasIkigai = Object.values(d.ikigai).some(Boolean);

  return (
    <Document title={`${d.name || "Soul"} — Soul Blueprint`} author="Alchemy of Desire">
      {/* ── PAGE 1 ─────────────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <OrbitalMark size={34} />
            <View>
              <Text style={styles.brandText}>Alchemy of Desire</Text>
              <Text style={styles.brandSub}>The Signal Technologies</Text>
            </View>
          </View>
          {d.name ? <Text style={styles.title}>{d.name}</Text> : null}
          {d.essence ? <Text style={styles.essence}>{clip(d.essence, 400)}</Text> : null}
          <View style={styles.goldRule} />
        </View>

        {d.storyThusFar ? (
          <Section num="01" label="Story Thus Far">
            <Text style={styles.body}>{clip(d.storyThusFar, 900)}</Text>
          </Section>
        ) : null}

        {d.wound || d.gift ? (
          <Section num="02" label="The Wound & The Gift">
            {d.wound ? <Text style={styles.muted}>{clip(d.wound, 500)}</Text> : null}
            {d.gift ? (
              <Highlight>
                <Text style={styles.highlightText}>{clip(d.gift, 500)}</Text>
              </Highlight>
            ) : null}
          </Section>
        ) : null}

        {d.turningPoint ? (
          <Section num="03" label="The Turning Point">
            <Text style={styles.body}>{clip(d.turningPoint, 500)}</Text>
          </Section>
        ) : null}

        {hasCompass ? (
          <Section num="04" label="The Compass">
            {d.admires ? (
              <>
                <Text style={styles.subLabel}>You admire</Text>
                <Text style={styles.muted}>{clip(d.admires, 350)}</Text>
              </>
            ) : null}
            {d.judges ? (
              <>
                <Text style={styles.subLabel}>You judge</Text>
                <Text style={styles.muted}>{clip(d.judges, 350)}</Text>
              </>
            ) : null}
            {d.envies ? (
              <>
                <Text style={styles.subLabel}>You secretly envy</Text>
                <Text style={styles.muted}>{clip(d.envies, 350)}</Text>
              </>
            ) : null}
            {d.trueNorth ? (
              <Highlight>
                <Text style={styles.highlightText}>{clip(d.trueNorth, 450)}</Text>
              </Highlight>
            ) : null}
          </Section>
        ) : null}

        <Footer page={1} total={3} />
      </Page>

      {/* ── PAGE 2 ─────────────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        {d.coreFeelings.length > 0 ? (
          <Section num="05" label="Core Desired Feelings">
            <View style={styles.chips}>
              {d.coreFeelings.map((f, i) => (
                <Text key={i} style={styles.chip}>
                  {clip(f, 40)}
                </Text>
              ))}
            </View>
          </Section>
        ) : null}

        {hasValues ? (
          <Section num="06" label="Values — Authentic vs. Inherited">
            <View style={styles.twoCol}>
              <View style={styles.col}>
                <Text style={styles.colHead}>Truly Yours</Text>
                {d.authenticValues.map((v, i) => (
                  <View key={i} style={styles.listItem}>
                    <Text style={styles.bullet}>·</Text>
                    <Text style={styles.body}>{clip(v, 60)}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.col}>
                <Text style={styles.colHead}>Inherited</Text>
                {d.inheritedValues.map((v, i) => (
                  <View key={i} style={styles.listItem}>
                    <Text style={styles.bullet}>·</Text>
                    <Text style={styles.muted}>{clip(v, 60)}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Section>
        ) : null}

        {d.shadow.hiddenDesires.length > 0 || d.shadow.gold ? (
          <Section num="07" label="The Shadow">
            {d.shadow.hiddenDesires.length > 0 ? (
              <>
                <Text style={styles.subLabel}>What you buried</Text>
                {d.shadow.hiddenDesires.map((s, i) => (
                  <View key={i} style={styles.listItem}>
                    <Text style={styles.bullet}>·</Text>
                    <Text style={styles.muted}>{clip(s, 120)}</Text>
                  </View>
                ))}
              </>
            ) : null}
            {d.shadow.gold ? (
              <Highlight>
                <Text style={styles.highlightText}>{clip(d.shadow.gold, 450)}</Text>
              </Highlight>
            ) : null}
          </Section>
        ) : null}

        {hasDream ? (
          <Section num="08" label="Dream Life, Interpreted">
            {(
              [
                ["Home", d.dreamLife.home],
                ["Work", d.dreamLife.work],
                ["Body", d.dreamLife.body],
                ["Family", d.dreamLife.family],
                ["Travel", d.dreamLife.travel],
                ["Network", d.dreamLife.network],
              ] as const
            ).map(([label, value]) =>
              value ? (
                <View key={label} style={styles.dreamItem}>
                  <Text style={styles.dreamLabel}>{label}</Text>
                  <Text style={styles.muted}>{clip(value, 350)}</Text>
                </View>
              ) : null
            )}
          </Section>
        ) : null}

        {d.antivision ? (
          <Section num="09" label="The Life You Refuse">
            <Text style={styles.muted}>{clip(d.antivision, 650)}</Text>
          </Section>
        ) : null}

        <Footer page={2} total={3} />
      </Page>

      {/* ── PAGE 3 ─────────────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        {d.futureSelf ? (
          <Section num="10" label="Your Future Self">
            <Text style={styles.body}>{clip(d.futureSelf, 1000)}</Text>
          </Section>
        ) : null}

        {d.beliefs.length > 0 ? (
          <Section num="11" label="The Gap to Bridge">
            {d.beliefs.map((b, i) => (
              <View key={i} style={styles.belief}>
                <Text style={styles.beliefOld}>{clip(b.belief, 350)}</Text>
                <Text style={styles.arrow}>→</Text>
                <Text style={styles.beliefNew}>{clip(b.replacement, 350)}</Text>
              </View>
            ))}
          </Section>
        ) : null}

        {d.mission || hasIkigai ? (
          <Section num="12" label="Your Mission">
            {d.mission ? <Text style={styles.body}>{clip(d.mission, 650)}</Text> : null}
            {hasIkigai ? (
              <View style={{ marginTop: 8 }}>
                {(
                  [
                    ["What you love", d.ikigai.love],
                    ["What you're good at", d.ikigai.goodAt],
                    ["What the world needs", d.ikigai.worldNeeds],
                    ["What sustains you", d.ikigai.sustains],
                  ] as const
                ).map(([label, value]) =>
                  value ? (
                    <View key={label} style={styles.dreamItem}>
                      <Text style={styles.dreamLabel}>{label}</Text>
                      <Text style={styles.muted}>{clip(value, 300)}</Text>
                    </View>
                  ) : null
                )}
              </View>
            ) : null}
          </Section>
        ) : null}

        {d.covenant.commitment || d.covenant.dailyPractice ? (
          <Section num="13" label="The Covenant">
            <View style={styles.covenant}>
              <Text style={styles.covenantHead}>A Binding Agreement with Yourself</Text>
              {d.covenant.commitment ? (
                <Text style={styles.body}>{clip(d.covenant.commitment, 700)}</Text>
              ) : null}
              {d.covenant.dailyPractice ? (
                <>
                  <Text style={styles.subLabel}>The daily practice</Text>
                  <Text style={styles.muted}>{clip(d.covenant.dailyPractice, 500)}</Text>
                </>
              ) : null}
              <View style={styles.signatureRow}>
                <View style={styles.signatureBox}>
                  <Text style={styles.signatureLine} />
                  <Text style={styles.signatureLabel}>Signature</Text>
                </View>
                <View style={styles.signatureBox}>
                  <Text style={styles.signatureLine} />
                  <Text style={styles.signatureLabel}>Date</Text>
                </View>
              </View>
            </View>
          </Section>
        ) : null}

        <Footer page={3} total={3} />
      </Page>
    </Document>
  );
}
