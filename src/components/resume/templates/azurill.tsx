"use client";

import type { ResumeData } from "@/types/resume";

// Azurill: Timeline design with left sidebar and circular dot markers
export function AzurillTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const { colors } = metadata.design;
  const { body: bf, heading: hf } = metadata.typography;
  const m = metadata.page;
  const sw = metadata.layout.sidebarWidth;
  const picture = data.picture;

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        fontFamily: bf.fontFamily,
        fontSize: bf.fontSize,
        lineHeight: bf.lineHeight,
        color: colors.text,
        backgroundColor: colors.background,
      }}
    >
      {/* Header - Centered */}
      <div
        style={{
          textAlign: "center",
          padding: `${m.marginY}px ${m.marginX}px`,
          paddingBottom: m.gapY,
          borderBottom: `2px solid ${colors.primary}20`,
        }}
      >
        {picture.url && !picture.effects.hidden && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <img
              src={picture.url}
              alt={basics.name}
              style={{
                width: picture.size,
                height: picture.size / picture.aspectRatio,
                borderRadius: picture.borderRadius,
                objectFit: "cover",
                border: picture.effects.border ? `2px solid ${colors.primary}` : "none",
                filter: picture.effects.grayscale ? "grayscale(100%)" : "none",
              }}
            />
          </div>
        )}
        <h1
          style={{
            fontFamily: hf.fontFamily,
            fontWeight: hf.fontWeight,
            fontSize: hf.fontSize * 1.8,
            lineHeight: hf.lineHeight,
            color: colors.primary,
          }}
        >
          {basics.name || "Your Name"}
        </h1>
        {basics.headline && (
          <p style={{ fontSize: bf.fontSize + 1, opacity: 0.7, marginTop: 4 }}>
            {basics.headline}
          </p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 8,
            fontSize: bf.fontSize - 2,
            opacity: 0.6,
          }}
        >
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
          {basics.url.url && <span>{basics.url.url}</span>}
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "flex",
          padding: `${m.gapY}px ${m.marginX}px ${m.marginY}px`,
          gap: m.gapX,
        }}
      >
        {/* Sidebar LEFT */}
        <div
          style={{
            width: `${sw}%`,
            display: "flex",
            flexDirection: "column",
            gap: m.gapY,
          }}
        >
          {/* Skills */}
          {sections.skills.visible && sections.skills.items.length > 0 && (
            <div>
              <SidebarHeading title={sections.skills.name} color={colors.primary} hf={hf} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sections.skills.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <div key={item.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: bf.fontSize - 1,
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                        <div style={{ display: "flex", gap: 2 }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                width: 14,
                                height: 4,
                                borderRadius: 2,
                                backgroundColor:
                                  i < item.level ? colors.primary : `${colors.primary}20`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {item.keywords.length > 0 && (
                        <div
                          style={{
                            fontSize: bf.fontSize - 2,
                            opacity: 0.6,
                            marginTop: 2,
                          }}
                        >
                          {item.keywords.join(" · ")}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {sections.languages.visible && sections.languages.items.length > 0 && (
            <div>
              <SidebarHeading title={sections.languages.name} color={colors.primary} hf={hf} />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {sections.languages.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <div key={item.id} style={{ fontSize: bf.fontSize - 1 }}>
                      <span style={{ fontWeight: 600 }}>{item.name}</span>
                      {item.description && (
                        <span style={{ opacity: 0.6 }}> — {item.description}</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {sections.interests.visible && sections.interests.items.length > 0 && (
            <div>
              <SidebarHeading title={sections.interests.name} color={colors.primary} hf={hf} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {sections.interests.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <span
                      key={item.id}
                      style={{
                        padding: "2px 8px",
                        borderRadius: 4,
                        backgroundColor: `${colors.primary}12`,
                        color: colors.primary,
                        fontSize: bf.fontSize - 2,
                      }}
                    >
                      {item.name}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* References */}
          {sections.references.visible && sections.references.items.length > 0 && (
            <div>
              <SidebarHeading title={sections.references.name} color={colors.primary} hf={hf} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sections.references.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <div key={item.id} style={{ fontSize: bf.fontSize - 1 }}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      {item.description && (
                        <div style={{ opacity: 0.6, fontSize: bf.fontSize - 2 }}>
                          {item.description}
                        </div>
                      )}
                      {item.summary && (
                        <div
                          style={{
                            fontStyle: "italic",
                            opacity: 0.7,
                            marginTop: 2,
                            fontSize: bf.fontSize - 2,
                          }}
                        >
                          &ldquo;{item.summary}&rdquo;
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {sections.certifications.visible && sections.certifications.items.length > 0 && (
            <div>
              <SidebarHeading title={sections.certifications.name} color={colors.primary} hf={hf} />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {sections.certifications.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <div key={item.id} style={{ fontSize: bf.fontSize - 1 }}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      {item.issuer && (
                        <div style={{ opacity: 0.6, fontSize: bf.fontSize - 2 }}>
                          {item.issuer}
                          {item.date && ` — ${item.date}`}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Column RIGHT - Timeline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: m.gapY,
          }}
        >
          {/* Summary */}
          {summary && (
            <TimelineSection
              title="Summary"
              color={colors.primary}
              hf={hf}
            >
              <p style={{ fontSize: bf.fontSize - 1 }}>{summary}</p>
            </TimelineSection>
          )}

          {/* Experience */}
          {sections.experience.visible && sections.experience.items.length > 0 && (
            <TimelineSection
              title={sections.experience.name}
              color={colors.primary}
              hf={hf}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {sections.experience.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <TimelineItem key={item.id} color={colors.primary}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>{item.position}</span>
                          {item.company && (
                            <span style={{ color: colors.primary }}> at {item.company}</span>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: bf.fontSize - 2,
                            opacity: 0.6,
                            whiteSpace: "nowrap",
                            marginLeft: 8,
                          }}
                        >
                          {item.date}
                        </span>
                      </div>
                      {item.location && (
                        <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6, marginTop: 1 }}>
                          {item.location}
                        </div>
                      )}
                      {item.description && (
                        <p
                          style={{
                            fontSize: bf.fontSize - 1,
                            marginTop: 4,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                    </TimelineItem>
                  ))}
              </div>
            </TimelineSection>
          )}

          {/* Education */}
          {sections.education.visible && sections.education.items.length > 0 && (
            <TimelineSection
              title={sections.education.name}
              color={colors.primary}
              hf={hf}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {sections.education.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <TimelineItem key={item.id} color={colors.primary}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>
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
                            fontSize: bf.fontSize - 2,
                            opacity: 0.6,
                            whiteSpace: "nowrap",
                            marginLeft: 8,
                          }}
                        >
                          {item.date}
                        </span>
                      </div>
                      {item.score && (
                        <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7, marginTop: 1 }}>
                          GPA: {item.score}
                        </div>
                      )}
                      {item.description && (
                        <p
                          style={{
                            fontSize: bf.fontSize - 1,
                            marginTop: 4,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                    </TimelineItem>
                  ))}
              </div>
            </TimelineSection>
          )}

          {/* Projects */}
          {sections.projects.visible && sections.projects.items.length > 0 && (
            <TimelineSection
              title={sections.projects.name}
              color={colors.primary}
              hf={hf}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sections.projects.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <TimelineItem key={item.id} color={colors.primary}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                        {item.date && (
                          <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p
                          style={{
                            fontSize: bf.fontSize - 1,
                            marginTop: 3,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                      {item.keywords.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 4,
                            marginTop: 4,
                          }}
                        >
                          {item.keywords.map((kw, idx) => (
                            <span
                              key={idx}
                              style={{
                                padding: "1px 6px",
                                borderRadius: 3,
                                backgroundColor: `${colors.primary}12`,
                                color: colors.primary,
                                fontSize: bf.fontSize - 2,
                              }}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </TimelineItem>
                  ))}
              </div>
            </TimelineSection>
          )}

          {/* Awards */}
          {sections.awards.visible && sections.awards.items.length > 0 && (
            <TimelineSection
              title={sections.awards.name}
              color={colors.primary}
              hf={hf}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sections.awards.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <TimelineItem key={item.id} color={colors.primary}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontWeight: 600 }}>{item.title}</span>
                        {item.date && (
                          <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.awarder && (
                        <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>
                          {item.awarder}
                        </div>
                      )}
                      {item.description && (
                        <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>
                          {item.description}
                        </p>
                      )}
                    </TimelineItem>
                  ))}
              </div>
            </TimelineSection>
          )}

          {/* Publications */}
          {sections.publications.visible && sections.publications.items.length > 0 && (
            <TimelineSection
              title={sections.publications.name}
              color={colors.primary}
              hf={hf}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sections.publications.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <TimelineItem key={item.id} color={colors.primary}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      {item.publisher && (
                        <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>
                          {item.publisher}
                          {item.date && ` — ${item.date}`}
                        </div>
                      )}
                      {item.description && (
                        <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>
                          {item.description}
                        </p>
                      )}
                    </TimelineItem>
                  ))}
              </div>
            </TimelineSection>
          )}

          {/* Volunteer */}
          {sections.volunteer.visible && sections.volunteer.items.length > 0 && (
            <TimelineSection
              title={sections.volunteer.name}
              color={colors.primary}
              hf={hf}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sections.volunteer.items
                  .filter((i) => !i.hidden)
                  .map((item) => (
                    <TimelineItem key={item.id} color={colors.primary}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>{item.position}</span>
                          {item.organization && (
                            <span style={{ color: colors.primary }}>
                              {" "}at {item.organization}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap", marginLeft: 8 }}>
                          {item.date}
                        </span>
                      </div>
                      {item.location && (
                        <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>
                          {item.location}
                        </div>
                      )}
                      {item.description && (
                        <p style={{ fontSize: bf.fontSize - 1, marginTop: 3, whiteSpace: "pre-wrap" }}>
                          {item.description}
                        </p>
                      )}
                    </TimelineItem>
                  ))}
              </div>
            </TimelineSection>
          )}
        </div>
      </div>
    </div>
  );
}

// === Sub-components ===

function SidebarHeading({
  title,
  color,
  hf,
}: {
  title: string;
  color: string;
  hf: { fontFamily: string; fontWeight: number; fontSize: number };
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: hf.fontFamily,
          fontWeight: hf.fontWeight,
          fontSize: hf.fontSize * 0.8,
          color,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        {title}
      </span>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

function TimelineSection({
  title,
  color,
  hf,
  children,
}: {
  title: string;
  color: string;
  hf: { fontFamily: string; fontWeight: number; fontSize: number };
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: hf.fontFamily,
          fontWeight: hf.fontWeight,
          fontSize: hf.fontSize,
          color,
          borderBottom: `2px solid ${color}`,
          paddingBottom: 4,
          marginBottom: 10,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function TimelineItem({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        paddingLeft: 20,
        borderLeft: `2px solid ${color}30`,
      }}
    >
      {/* Dot marker */}
      <div
        style={{
          position: "absolute",
          left: -5,
          top: 6,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      {children}
    </div>
  );
}
