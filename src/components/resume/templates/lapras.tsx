"use client";

import type { ResumeData } from "@/types/resume";

// Lapras: Card-based design with bordered rounded sections
export function LaprasTemplate({ data }: { data: ResumeData }) {
  const { basics, summary, sections, metadata } = data;
  const { colors } = metadata.design;
  const { body: bf, heading: hf } = metadata.typography;
  const m = metadata.page;
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
        padding: `${m.marginY}px ${m.marginX}px`,
      }}
    >
      {/* Header Card */}
      <div
        style={{
          border: `1.5px solid ${colors.primary}40`,
          borderRadius: 8,
          padding: "16px 20px",
          marginBottom: m.gapY,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {picture.url && !picture.effects.hidden && (
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
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: hf.fontFamily,
              fontWeight: hf.fontWeight,
              fontSize: hf.fontSize * 1.8,
              lineHeight: 1.1,
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
          {/* Contact - pipe separated */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: 8,
              fontSize: bf.fontSize - 2,
              opacity: 0.6,
            }}
          >
            {[basics.email, basics.phone, basics.location, basics.url.url]
              .filter(Boolean)
              .map((item, idx, arr) => (
                <span key={idx}>
                  {item}
                  {idx < arr.length - 1 && (
                    <span style={{ margin: "0 8px", opacity: 0.5 }}>|</span>
                  )}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: m.gapY }}>
        {/* Summary */}
        {summary && (
          <CardSection title="Summary" color={colors.primary} hf={hf} bg={colors.background}>
            <p style={{ fontSize: bf.fontSize - 1 }}>{summary}</p>
          </CardSection>
        )}

        {/* Experience */}
        {sections.experience.visible && sections.experience.items.length > 0 && (
          <CardSection title={sections.experience.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sections.experience.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <div key={item.id}>
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
                  </div>
                ))}
            </div>
          </CardSection>
        )}

        {/* Education */}
        {sections.education.visible && sections.education.items.length > 0 && (
          <CardSection title={sections.education.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sections.education.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <div key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div>
                        <span style={{ fontWeight: 600 }}>
                          {item.studyType}
                          {item.area && ` in ${item.area}`}
                        </span>
                        {item.institution && (
                          <span style={{ color: colors.primary }}> at {item.institution}</span>
                        )}
                      </div>
                      <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap", marginLeft: 8 }}>
                        {item.date}
                      </span>
                    </div>
                    {item.score && (
                      <div style={{ fontSize: bf.fontSize - 2, opacity: 0.7, marginTop: 1 }}>
                        GPA: {item.score}
                      </div>
                    )}
                    {item.description && (
                      <p style={{ fontSize: bf.fontSize - 1, marginTop: 4, whiteSpace: "pre-wrap" }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </CardSection>
        )}

        {/* Skills */}
        {sections.skills.visible && sections.skills.items.length > 0 && (
          <CardSection title={sections.skills.name} color={colors.primary} hf={hf} bg={colors.background}>
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
                              width: 16,
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
          </CardSection>
        )}

        {/* Projects */}
        {sections.projects.visible && sections.projects.items.length > 0 && (
          <CardSection title={sections.projects.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sections.projects.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <div key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontWeight: 600 }}>{item.name}</span>
                      {item.date && (
                        <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>
                      )}
                    </div>
                    {item.description && (
                      <p style={{ fontSize: bf.fontSize - 1, marginTop: 3, whiteSpace: "pre-wrap" }}>
                        {item.description}
                      </p>
                    )}
                    {item.keywords.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
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
                  </div>
                ))}
            </div>
          </CardSection>
        )}

        {/* Languages */}
        {sections.languages.visible && sections.languages.items.length > 0 && (
          <CardSection title={sections.languages.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: bf.fontSize - 1 }}>
              {sections.languages.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <span key={item.id}>
                    <strong>{item.name}</strong>
                    {item.description && (
                      <span style={{ opacity: 0.6 }}> — {item.description}</span>
                    )}
                  </span>
                ))}
            </div>
          </CardSection>
        )}

        {/* Awards */}
        {sections.awards.visible && sections.awards.items.length > 0 && (
          <CardSection title={sections.awards.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sections.awards.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <div key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontWeight: 600 }}>{item.title}</span>
                      {item.date && (
                        <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.date}</span>
                      )}
                    </div>
                    {item.awarder && (
                      <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.awarder}</div>
                    )}
                    {item.description && (
                      <p style={{ fontSize: bf.fontSize - 1, marginTop: 2, whiteSpace: "pre-wrap" }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </CardSection>
        )}

        {/* Certifications */}
        {sections.certifications.visible && sections.certifications.items.length > 0 && (
          <CardSection title={sections.certifications.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {sections.certifications.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <div key={item.id} style={{ fontSize: bf.fontSize - 1 }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    {item.issuer && <span style={{ opacity: 0.6 }}> — {item.issuer}</span>}
                    {item.date && (
                      <span style={{ fontSize: bf.fontSize - 2, opacity: 0.5 }}> ({item.date})</span>
                    )}
                  </div>
                ))}
            </div>
          </CardSection>
        )}

        {/* Publications */}
        {sections.publications.visible && sections.publications.items.length > 0 && (
          <CardSection title={sections.publications.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sections.publications.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <div key={item.id}>
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
                  </div>
                ))}
            </div>
          </CardSection>
        )}

        {/* Volunteer */}
        {sections.volunteer.visible && sections.volunteer.items.length > 0 && (
          <CardSection title={sections.volunteer.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sections.volunteer.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <div key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div>
                        <span style={{ fontWeight: 600 }}>{item.position}</span>
                        {item.organization && (
                          <span style={{ color: colors.primary }}> at {item.organization}</span>
                        )}
                      </div>
                      <span style={{ fontSize: bf.fontSize - 2, opacity: 0.6, whiteSpace: "nowrap", marginLeft: 8 }}>
                        {item.date}
                      </span>
                    </div>
                    {item.location && (
                      <div style={{ fontSize: bf.fontSize - 2, opacity: 0.6 }}>{item.location}</div>
                    )}
                    {item.description && (
                      <p style={{ fontSize: bf.fontSize - 1, marginTop: 3, whiteSpace: "pre-wrap" }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </CardSection>
        )}

        {/* Interests */}
        {sections.interests.visible && sections.interests.items.length > 0 && (
          <CardSection title={sections.interests.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {sections.interests.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <span
                    key={item.id}
                    style={{
                      padding: "2px 10px",
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
          </CardSection>
        )}

        {/* References */}
        {sections.references.visible && sections.references.items.length > 0 && (
          <CardSection title={sections.references.name} color={colors.primary} hf={hf} bg={colors.background}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sections.references.items
                .filter((i) => !i.hidden)
                .map((item) => (
                  <div key={item.id}>
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
          </CardSection>
        )}
      </div>
    </div>
  );
}

// === Sub-components ===

function CardSection({
  title,
  color,
  hf,
  bg,
  children,
}: {
  title: string;
  color: string;
  hf: { fontFamily: string; fontWeight: number; fontSize: number };
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: `1px solid ${color}30`,
        borderRadius: 8,
        padding: "14px 16px",
        position: "relative",
      }}
    >
      {/* Floating heading above the border */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: 16,
          backgroundColor: bg,
          padding: "0 8px",
          fontFamily: hf.fontFamily,
          fontWeight: hf.fontWeight,
          fontSize: hf.fontSize * 0.85,
          color,
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
