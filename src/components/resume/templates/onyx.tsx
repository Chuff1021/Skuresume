"use client";

import type { ResumeData, ExperienceItem, EducationItem, SkillItem } from "@/types/resume";

interface TemplateProps {
  data: ResumeData;
}

export function OnyxTemplate({ data }: TemplateProps) {
  const { basics, summary, sections, metadata } = data;
  const { colors } = metadata.design;
  const { body: bodyFont, heading: headingFont } = metadata.typography;

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        fontFamily: bodyFont.fontFamily,
        fontSize: bodyFont.fontSize,
        lineHeight: bodyFont.lineHeight,
        color: colors.text,
        backgroundColor: colors.background,
        padding: `${metadata.page.marginY}px ${metadata.page.marginX}px`,
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1
          style={{
            fontFamily: headingFont.fontFamily,
            fontWeight: headingFont.fontWeight,
            fontSize: headingFont.fontSize * 1.8,
            lineHeight: headingFont.lineHeight,
            color: colors.primary,
          }}
        >
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p
            className="mt-1"
            style={{ fontSize: bodyFont.fontSize + 2, color: colors.text }}
          >
            {basics.headline}
          </p>
        )}
        <div
          className="flex items-center justify-center gap-3 mt-2 flex-wrap"
          style={{ fontSize: bodyFont.fontSize - 2, opacity: 0.7 }}
        >
          {basics.email && <span>{basics.email}</span>}
          {basics.email && basics.phone && <span>|</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {(basics.email || basics.phone) && basics.location && <span>|</span>}
          {basics.location && <span>{basics.location}</span>}
          {basics.url.url && (
            <>
              <span>|</span>
              <span>{basics.url.url}</span>
            </>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex" style={{ gap: metadata.page.gapX }}>
        {/* Main Column */}
        <div className="flex-1" style={{ display: "flex", flexDirection: "column", gap: metadata.page.gapY }}>
          {/* Summary */}
          {summary && (
            <div>
              <SectionHeading
                title="Summary"
                color={colors.primary}
                fontFamily={headingFont.fontFamily}
                fontWeight={headingFont.fontWeight}
                fontSize={headingFont.fontSize}
              />
              <p style={{ fontSize: bodyFont.fontSize - 1 }}>{summary}</p>
            </div>
          )}

          {/* Experience */}
          {sections.experience.visible && sections.experience.items.length > 0 && (
            <div>
              <SectionHeading
                title={sections.experience.name}
                color={colors.primary}
                fontFamily={headingFont.fontFamily}
                fontWeight={headingFont.fontWeight}
                fontSize={headingFont.fontSize}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sections.experience.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <ExperienceEntry key={item.id} item={item} colors={colors} bodyFont={bodyFont} />
                  ))}
              </div>
            </div>
          )}

          {/* Education */}
          {sections.education.visible && sections.education.items.length > 0 && (
            <div>
              <SectionHeading
                title={sections.education.name}
                color={colors.primary}
                fontFamily={headingFont.fontFamily}
                fontWeight={headingFont.fontWeight}
                fontSize={headingFont.fontSize}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sections.education.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <EducationEntry key={item.id} item={item} colors={colors} bodyFont={bodyFont} />
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div
          style={{
            width: `${metadata.layout.sidebarWidth}%`,
            display: "flex",
            flexDirection: "column",
            gap: metadata.page.gapY,
          }}
        >
          {/* Skills */}
          {sections.skills.visible && sections.skills.items.length > 0 && (
            <div>
              <SectionHeading
                title={sections.skills.name}
                color={colors.primary}
                fontFamily={headingFont.fontFamily}
                fontWeight={headingFont.fontWeight}
                fontSize={headingFont.fontSize}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sections.skills.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <SkillEntry key={item.id} item={item} colors={colors} bodyFont={bodyFont} />
                  ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {sections.languages.visible && sections.languages.items.length > 0 && (
            <div>
              <SectionHeading
                title={sections.languages.name}
                color={colors.primary}
                fontFamily={headingFont.fontFamily}
                fontWeight={headingFont.fontWeight}
                fontSize={headingFont.fontSize}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {sections.languages.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <div key={item.id} style={{ fontSize: bodyFont.fontSize - 1 }}>
                      <span style={{ fontWeight: 600 }}>{item.name}</span>
                      {item.description && (
                        <span style={{ opacity: 0.7 }}> — {item.description}</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {sections.interests.visible && sections.interests.items.length > 0 && (
            <div>
              <SectionHeading
                title={sections.interests.name}
                color={colors.primary}
                fontFamily={headingFont.fontFamily}
                fontWeight={headingFont.fontWeight}
                fontSize={headingFont.fontSize}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, fontSize: bodyFont.fontSize - 1 }}>
                {sections.interests.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <span
                      key={item.id}
                      style={{
                        padding: "2px 8px",
                        borderRadius: 4,
                        backgroundColor: `${colors.primary}15`,
                        color: colors.primary,
                        fontSize: bodyFont.fontSize - 2,
                      }}
                    >
                      {item.name}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// === Sub-components ===

function SectionHeading({
  title,
  color,
  fontFamily,
  fontWeight,
  fontSize,
}: {
  title: string;
  color: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
}) {
  return (
    <div
      style={{
        fontFamily,
        fontWeight,
        fontSize,
        color,
        borderBottom: `2px solid ${color}`,
        paddingBottom: 4,
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      {title}
    </div>
  );
}

function ExperienceEntry({
  item,
  colors,
  bodyFont,
}: {
  item: ExperienceItem;
  colors: { primary: string; text: string };
  bodyFont: { fontSize: number };
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div>
          <span style={{ fontWeight: 600, fontSize: bodyFont.fontSize }}>
            {item.position}
          </span>
          {item.company && (
            <span style={{ color: colors.primary }}>
              {" "}at {item.company}
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: bodyFont.fontSize - 2,
            opacity: 0.6,
            whiteSpace: "nowrap",
            marginLeft: 8,
          }}
        >
          {item.date}
        </span>
      </div>
      {item.location && (
        <div
          style={{ fontSize: bodyFont.fontSize - 2, opacity: 0.6, marginTop: 1 }}
        >
          {item.location}
        </div>
      )}
      {item.description && (
        <p
          style={{
            fontSize: bodyFont.fontSize - 1,
            marginTop: 4,
            whiteSpace: "pre-wrap",
          }}
        >
          {item.description}
        </p>
      )}
    </div>
  );
}

function EducationEntry({
  item,
  colors,
  bodyFont,
}: {
  item: EducationItem;
  colors: { primary: string; text: string };
  bodyFont: { fontSize: number };
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div>
          <span style={{ fontWeight: 600, fontSize: bodyFont.fontSize }}>
            {item.studyType}
            {item.area && ` in ${item.area}`}
          </span>
          {item.institution && (
            <span style={{ color: colors.primary }}>
              {" "}at {item.institution}
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: bodyFont.fontSize - 2,
            opacity: 0.6,
            whiteSpace: "nowrap",
            marginLeft: 8,
          }}
        >
          {item.date}
        </span>
      </div>
      {item.score && (
        <div style={{ fontSize: bodyFont.fontSize - 2, opacity: 0.7, marginTop: 1 }}>
          GPA: {item.score}
        </div>
      )}
      {item.description && (
        <p
          style={{
            fontSize: bodyFont.fontSize - 1,
            marginTop: 4,
            whiteSpace: "pre-wrap",
          }}
        >
          {item.description}
        </p>
      )}
    </div>
  );
}

function SkillEntry({
  item,
  colors,
  bodyFont,
}: {
  item: SkillItem;
  colors: { primary: string };
  bodyFont: { fontSize: number };
}) {
  return (
    <div>
      <div className="flex items-center justify-between" style={{ fontSize: bodyFont.fontSize - 1 }}>
        <span style={{ fontWeight: 600 }}>{item.name}</span>
        {/* Level bar */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 4,
                borderRadius: 2,
                backgroundColor: i < item.level ? colors.primary : `${colors.primary}20`,
              }}
            />
          ))}
        </div>
      </div>
      {item.keywords.length > 0 && (
        <div
          style={{
            fontSize: bodyFont.fontSize - 2,
            opacity: 0.7,
            marginTop: 2,
          }}
        >
          {item.keywords.join(" · ")}
        </div>
      )}
    </div>
  );
}
