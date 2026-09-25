import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Circle,
} from "@react-pdf/renderer";
import type { BriefData, Priority } from "@/lib/brief/types";

/* Brand tokens mirror src/app/globals.css. react-pdf has no CSS variables,
   so the canonical COSMIC AFRICAN SOUL values are declared here once. */

const FOUNDATION = "#080808";
const SURFACE = "#0F0F10";
const GOLD = "#C47A00";
const TEAL = "#00BFA6";
const OFF_WHITE = "#F2EDE4";
const MUTE = "#8A8581";
const LINE = "#1F1E1B";

const PRIORITY_COLOR: Record<Priority, string> = {
  must: GOLD,
  want: TEAL,
  nice: MUTE,
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: FOUNDATION,
    color: OFF_WHITE,
    fontFamily: "Inter",
    paddingVertical: 40,
    paddingHorizontal: 44,
    fontSize: 10,
    lineHeight: 1.55,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    paddingBottom: 16,
    marginBottom: 20,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  mark: {
    marginRight: 12,
  },
  brandBlock: {},
  brandText: {
    fontFamily: "IBM Plex Mono",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: 2,
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  eyebrow: {
    fontFamily: "IBM Plex Mono",
    fontSize: 8,
    letterSpacing: 2,
    color: TEAL,
    textTransform: "uppercase",
    marginBottom: 0,
  },
  title: {
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    fontSize: 26,
    color: OFF_WHITE,
    marginBottom: 6,
  },
  oneLiner: {
    fontFamily: "Space Grotesk",
    fontSize: 12,
    color: GOLD,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontFamily: "IBM Plex Mono",
    fontSize: 8,
    letterSpacing: 1.5,
    color: TEAL,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  body: {
    color: OFF_WHITE,
    fontSize: 10,
  },
  muted: {
    color: MUTE,
    fontSize: 10,
  },
  desire: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  priorityBadge: {
    fontFamily: "IBM Plex Mono",
    fontWeight: 500,
    fontSize: 7,
    letterSpacing: 1,
    textTransform: "uppercase",
    width: 34,
    paddingTop: 2,
  },
  desireBody: {
    flex: 1,
  },
  desireLabel: {
    fontFamily: "Space Grotesk",
    fontWeight: 700,
    fontSize: 10,
    color: OFF_WHITE,
    marginBottom: 2,
  },
  desireDetail: {
    color: MUTE,
    fontSize: 9,
  },
  footer: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: LINE,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerBrand: {
    fontFamily: "IBM Plex Mono",
    fontWeight: 500,
    fontSize: 8,
    letterSpacing: 1.5,
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  footerText: {
    fontFamily: "IBM Plex Mono",
    fontSize: 7,
    color: MUTE,
  },
});

function OrbitalMark({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" style={styles.mark}>
      <Circle cx={100} cy={100} r={88} fill="none" stroke={LINE} strokeWidth={1} />
      <Circle cx={100} cy={12} r={4} fill={GOLD} />
      <Circle cx={100} cy={100} r={62} fill="none" stroke={LINE} strokeWidth={1} />
      <Circle cx={45} cy={122} r={3} fill={TEAL} />
      <Circle
        cx={100}
        cy={100}
        r={14}
        fill={FOUNDATION}
        stroke={GOLD}
        strokeWidth={1.5}
      />
      <Circle cx={100} cy={100} r={3} fill={GOLD} />
    </Svg>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <Text style={styles.body}>{value}</Text>
    </View>
  );
}

export function BriefPdfDocument({ data }: { data: BriefData }) {
  const desires = data.desires ?? [];

  return (
    <Document
      title={`${data.projectName} — Project Brief`}
      author="Lawrence Nwuzor"
      subject="Project brief"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <OrbitalMark size={30} />
            <View style={styles.brandBlock}>
              <Text style={styles.brandText}>The Signal Technologies</Text>
              <Text style={styles.eyebrow}>The Brief</Text>
            </View>
          </View>
          <Text style={styles.title}>{data.projectName}</Text>
          {data.oneLiner ? (
            <Text style={styles.oneLiner}>{data.oneLiner}</Text>
          ) : null}
        </View>

        {data.clientName ? (
          <Field label="Prepared for" value={data.clientName} />
        ) : null}
        {data.vision ? <Field label="The vision" value={data.vision} /> : null}
        {data.audience ? <Field label="Who it's for" value={data.audience} /> : null}

        {desires.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Desires</Text>
            {desires.map((d, i) => (
              <View key={i} style={styles.desire}>
                <Text
                  style={[styles.priorityBadge, { color: PRIORITY_COLOR[d.priority] }]}
                >
                  {d.priority}
                </Text>
                <View style={styles.desireBody}>
                  <Text style={styles.desireLabel}>{d.label}</Text>
                  {d.detail ? (
                    <Text style={styles.desireDetail}>{d.detail}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {data.references.loves ||
        data.references.hates ||
        data.references.inspirations ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>References</Text>
            {data.references.loves ? (
              <Text style={styles.muted}>Loves: {data.references.loves}</Text>
            ) : null}
            {data.references.hates ? (
              <Text style={styles.muted}>Hates: {data.references.hates}</Text>
            ) : null}
            {data.references.inspirations ? (
              <Text style={styles.muted}>
                Inspirations: {data.references.inspirations}
              </Text>
            ) : null}
          </View>
        ) : null}

        {data.constraints.budget ||
        data.constraints.timeline ||
        data.constraints.offLimits ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Boundaries</Text>
            {data.constraints.budget ? (
              <Text style={styles.muted}>Budget: {data.constraints.budget}</Text>
            ) : null}
            {data.constraints.timeline ? (
              <Text style={styles.muted}>
                Timeline: {data.constraints.timeline}
              </Text>
            ) : null}
            {data.constraints.offLimits ? (
              <Text style={styles.muted}>
                Off-limits: {data.constraints.offLimits}
              </Text>
            ) : null}
          </View>
        ) : null}

        {data.successMetrics ? (
          <Field label="How success is measured" value={data.successMetrics} />
        ) : null}

        <View style={styles.footer}>
          <View>
            <Text style={styles.footerBrand}>The Signal Technologies</Text>
            <Text style={styles.footerText}>
              Lawrence Nwuzor · lawrencenwuzor.com
            </Text>
          </View>
          <Text style={styles.footerText}>
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
