"use client";

import type { ResumeData } from "@/types/resume";

// Rhyhorn: Reverse header (name/contact LEFT, picture RIGHT), single column
export function RhyhornTemplate({ data }: { data: ResumeData }) {
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
      {/* Header - name/contact LEFT, picture RIGHT */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: m.gapY,
          paddingBottom: m.gapY,
          borderBottom: `2px solid ${colors.primary}`,
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: hf.fontFamily,
              fontWeight: hf.fontWeight,
              fontSize: hf.fontSize * 2,
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
          {/* Contact items separated by pipe */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 0,
              marginTop: 10,
              fontSize: bf.fontSize - 1,
              opacity: 0.6,
            }}
          >
            {[
              basics.email,
              basics.phone,
              basics.location,
              basics.url.url,
            ]
              .filter(Boolean)
              .map((item, idx, arr) => (
                <span key={idx}>
                  {item}
                  {idx < arr.length - 1 && (
                    <span
                      style={{
                        margin: "0 8px",
                        color: colors.primary,
                        opacity: 0.5,
                      }}
                    >
                      |
                    </span>
                  )}
                </span>
              ))}
          </div>
        </div>
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
              marginLeft: 20,
              flexShrink: 0,
            }}
          />
        )}
      </div>

      {/* Sections stacked */}
      <div style={{ display: "flex", flexDirection: "column", gap: m.gapY }}>
        {/* Summary */}
        {summary && (
          <div>
            <SectionHeading title="Summary" color={colors.primary} hf={hf} />
            <p style={{ fontSize: bf.fontSize - 1 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {sections.experience.visible && sections.experience.items.length > 0 && (
          <div>
            <SectionHeading title={sections.experience.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Education */}
        {sections.education.visible && sections.education.items.length > 0 && (
          <div>
            <SectionHeading title={sections.education.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Skills */}
        {sections.skills.visible && sections.skills.items.length > 0 && (
          <div>
            <SectionHeading title={sections.skills.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Projects */}
        {sections.projects.visible && sections.projects.items.length > 0 && (
          <div>
            <SectionHeading title={sections.projects.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Languages */}
        {sections.languages.visible && sections.languages.items.length > 0 && (
          <div>
            <SectionHeading title={sections.languages.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Awards */}
        {sections.awards.visible && sections.awards.items.length > 0 && (
          <div>
            <SectionHeading title={sections.awards.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Certifications */}
        {sections.certifications.visible && sections.certifications.items.length > 0 && (
          <div>
            <SectionHeading title={sections.certifications.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Publications */}
        {sections.publications.visible && sections.publications.items.length > 0 && (
          <div>
            <SectionHeading title={sections.publications.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Volunteer */}
        {sections.volunteer.visible && sections.volunteer.items.length > 0 && (
          <div>
            <SectionHeading title={sections.volunteer.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* Interests */}
        {sections.interests.visible && sections.interests.items.length > 0 && (
          <div>
            <SectionHeading title={sections.interests.name} color={colors.primary} hf={hf} />
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
          </div>
        )}

        {/* References */}
        {sections.references.visible && sections.references.items.length > 0 && (
          <div>
            <SectionHeading title={sections.references.name} color={colors.primary} hf={hf} />
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
          </div>
        )}
      </div>
    </div>
  );
}

// === Sub-components ===

function SectionHeading({
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
        fontFamily: hf.fontFamily,
        fontWeight: hf.fontWeight,
        fontSize: hf.fontSize,
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
