"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/language-context"
import { publicPagesContent } from "@/lib/i18n/content/public-pages"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"

export function AboutContent() {
  const { locale } = useTranslation()
  const d = publicPagesContent[locale].about

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Hero */}
      <FadeInUp>
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {d.heroHeading}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {d.heroDescription}
          </p>
        </div>
      </FadeInUp>

      {/* Mission & Vision */}
      <StaggerContainer className="mb-16 grid gap-6 sm:grid-cols-2">
        <StaggerItem>
          <Card className="h-full border-none bg-muted/50 shadow-none">
            <CardContent className="pt-2">
              <h2 className="mb-3 text-xl font-semibold">{d.mission.title}</h2>
              <p className="text-muted-foreground">{d.mission.content}</p>
            </CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="h-full border-none bg-muted/50 shadow-none">
            <CardContent className="pt-2">
              <h2 className="mb-3 text-xl font-semibold">{d.vision.title}</h2>
              <p className="text-muted-foreground">{d.vision.content}</p>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Team */}
      <FadeInUp>
        <div className="mb-16">
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {d.team.title}
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            {d.team.subtitle}
          </p>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2">
            {d.team.members.map((member) => (
              <StaggerItem key={member.initials}>
                <Card className="border-none bg-muted/50 shadow-none">
                  <CardContent className="flex items-start gap-4 pt-2">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold">{member.name}</p>
                      <p className="mb-2 text-sm text-primary">{member.role}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeInUp>

      {/* Competition */}
      <FadeInUp>
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            {d.competition.title}
          </h2>
          {d.competition.content.map((p, i) => (
            <p key={i} className="mb-3 text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </FadeInUp>

      {/* SDG */}
      <FadeInUp>
        <div>
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight">
            {d.sdg.title}
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            {d.sdg.subtitle}
          </p>
          <StaggerContainer className="grid gap-6 sm:grid-cols-3">
            {d.sdg.goals.map((goal) => (
              <StaggerItem key={goal.number}>
                <Card className="h-full border-none bg-muted/50 shadow-none">
                  <CardContent className="pt-2 text-center">
                    <Badge
                      variant="secondary"
                      className="mb-3 text-lg font-bold"
                    >
                      SDG {goal.number}
                    </Badge>
                    <h3 className="mb-2 font-semibold">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeInUp>
    </div>
  )
}
