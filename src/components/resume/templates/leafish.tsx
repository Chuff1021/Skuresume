"use client";

import type { ResumeData } from "@/types/resume";

// Leafish: Tinted header bands with two-column layout (main LEFT, sidebar RIGHT)
export function LeafishTemplate({ data }: { data: ResumeData }) {
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
      {/* Header band - tinted background */}
      <div
        style={{
          backgroundColor: `${colors.primary}12`,
          padding: `${m.marginY}px ${m.marginX}px`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
            {/* Summary integrated into header */}
            {summary && (
              <p
                style={{
                  fontSize: bf.fontSize - 1,
                  marginTop: 8,
                  opacity: 0.8,
                  lineHeight: 1.5,
                }}
              >
                {summary}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Contact band - second tinted band */}
      <div
        style={{
          backgroundColor: `${colors.primary}08`,
          padding: `8px ${m.marginX}px`,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          fontSize: bf.fontSize - 2,
          borderBottom: `1px solid ${colors.primary}20`,
        }}
      >
        {basics.email && <span>{basics.email}</span>}
        {basics.phone && <span>{basics.phone}</span>}
        {basics.location && <span>{basics.location}</span>}
        {basics.url.url && <span>{basics.url.url}</span>}
      </div>

      {/* Two-column content */}
      <div
        style={{
          display: "flex",
          padding: `${m.gapY}px ${m.marginX}px ${m.marginY}px`,
          gap: m.gapX,
        }}
      >
        {/* Main Column LEFT */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: m.gapY,
          }}
        >
          {/* Experience */}
          {sections.experience.visible && sections.experience.items.length > 0 && (
            <div>
              <MainHeading title={sections.experience.name} color={colors.primary} hf={hf} />
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
              <MainHeading title={sections.education.name} color={colors.primary} hf={hf} />
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

          {/* Projects */}
          {sections.projects.visible && sections.projects.items.length > 0 && (
            <div>
              <MainHeading title={sections.projects.name} color={colors.primary} hf={hf} />
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

          {/* Awards */}
          {sections.awards.visible && sections.awards.items.length > 0 && (
            <div>
              <MainHeading title={sections.awards.name} color={colors.primary} hf={hf} />
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

          {/* Publications */}
          {sections.publications.visible && sections.publications.items.length > 0 && (
            <div>
              <MainHeading title={sections.publications.name} color={colors.primary} hf={hf} />
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
              <MainHeading title={sections.volunteer.name} color={colors.primary} hf={hf} />
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
        </div>

        {/* Sidebar RIGHT */}
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
                          fontSize: bf.fontSize - 1,
                          fontWeight: 600,
                          marginBottom: 3,
                        }}
                      >
                        {item.name}
                      </div>
                      {/* Level bar - 5 segments */}
                      <div style={{ display: "flex", gap: 2 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: 4,
                              borderRadius: 2,
                              backgroundColor:
                                i < item.level ? colors.primary : `${colors.primary}20`,
                            }}
                          />
                        ))}
                      </div>
                      {item.keywords.length > 0 && (
                        <div
                          style={{
                            fontSize: bf.fontSize - 2,
                            opacity: 0.6,
                            marginTop: 3,
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
                        backgroundColor: `${colors.primary}15`,
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
        </div>
      </div>
    </div>
  );
}

// === Sub-components ===

function MainHeading({
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
        fontFamily: hf.fontFamily,
        fontWeight: hf.fontWeight,
        fontSize: hf.fontSize * 0.8,
        color,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 8,
        paddingBottom: 4,
        borderBottom: `1px solid ${color}30`,
      }}
    >
      {title}
    </div>
  );
}
