"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Send, Eye, Users, CheckCircle } from "lucide-react"

interface Candidate {
  id: string
  name: string
  email: string
  position: string
  skills: string[]
  avatar: string
}

export function Applicants() {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [emailSubject, setEmailSubject] = useState("弊社でのエキサイティングな機会について")
  const [emailBody, setEmailBody] = useState(
    "[候補者名]様\n\nお疲れ様です。\n\nあなたのプロフィールを拝見し、[スキル]のスキルをお持ちの方として、弊社でのポジションについてお話しさせていただきたく思います。\n\nこちらの役職について、簡単にお話しする機会をいただけますでしょうか？\n\nよろしくお願いいたします。\n採用チーム",
  )
  const [previewCandidate, setPreviewCandidate] = useState<Candidate | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [sendingStatus, setSendingStatus] = useState<"idle" | "sending" | "success">("idle")

  const candidates: Candidate[] = [
    {
      id: "1",
      name: "田中 由紀",
      email: "tanaka.yuki@example.com",
      position: "フロントエンドエンジニア",
      skills: ["React", "TypeScript", "UI/UX"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "鈴木 陽翔",
      email: "suzuki.haruto@example.com",
      position: "バックエンドエンジニア",
      skills: ["Node.js", "Python", "AWS"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "佐藤 葵",
      email: "sato.aoi@example.com",
      position: "フルスタックエンジニア",
      skills: ["React", "Node.js", "MongoDB"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "渡辺 凛",
      email: "watanabe.rin@example.com",
      position: "DevOpsエンジニア",
      skills: ["Docker", "Kubernetes", "CI/CD"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "山本 陽菜",
      email: "yamamoto.hina@example.com",
      position: "UI/UXデザイナー",
      skills: ["Figma", "Adobe XD", "ユーザーリサーチ"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }

  const selectAllCandidates = () => {
    setSelectedCandidates(candidates.map((candidate) => candidate.id))
  }

  const deselectAllCandidates = () => {
    setSelectedCandidates([])
  }

  const handlePreview = (candidate: Candidate) => {
    setPreviewCandidate(candidate)
    setShowPreview(true)
  }

  const getPersonalizedEmail = (candidate: Candidate) => {
    const personalizedBody = emailBody
      .replace("[候補者名]", candidate.name)
      .replace("[スキル]", candidate.skills.join("、"))
    return personalizedBody
  }

  const handleSendEmails = async () => {
    setSendingStatus("sending")

    // API呼び出しのシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSendingStatus("success")
    setTimeout(() => {
      setSendingStatus("idle")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">スカウトメール配信</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={selectAllCandidates} size="sm">
            全て選択
          </Button>
          <Button variant="outline" onClick={deselectAllCandidates} size="sm">
            全て解除
          </Button>
        </div>
      </div>

      <Tabs defaultValue="candidates">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="candidates">
            <Users className="mr-2 h-4 w-4" /> 候補者 ({candidates.length}名)
          </TabsTrigger>
          <TabsTrigger value="compose">
            <Mail className="mr-2 h-4 w-4" /> メール作成
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={selectedCandidates.length === 0}>
            <Eye className="mr-2 h-4 w-4" /> プレビュー
          </TabsTrigger>
        </TabsList>

        <TabsContent value="candidates" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>候補者選択 ({selectedCandidates.length}名選択中)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      selectedCandidates.includes(candidate.id) ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox
                        id={`candidate-${candidate.id}`}
                        checked={selectedCandidates.includes(candidate.id)}
                        onCheckedChange={() => toggleCandidateSelection(candidate.id)}
                      />
                      <Avatar>
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium">{candidate.position}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handlePreview(candidate)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>スカウトメール作成</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    件名
                  </label>
                  <Input
                    id="subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="メールの件名を入力してください"
                  />
                </div>
                <div>
                  <label htmlFor="body" className="block text-sm font-medium mb-1">
                    本文
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">
                    [候補者名]と[スキル]をプレースホルダーとして使用できます。実際の値に置き換えられます。
                  </p>
                  <Textarea
                    id="body"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="メール本文を入力してください"
                    rows={10}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>メールプレビュー</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <strong>{selectedCandidates.length}名</strong>の候補者に送信
                  </p>
                  <Button
                    onClick={handleSendEmails}
                    disabled={sendingStatus !== "idle" || selectedCandidates.length === 0}
                  >
                    {sendingStatus === "sending" ? (
                      "送信中..."
                    ) : sendingStatus === "success" ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" /> 送信完了
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> スカウトメール送信
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  {selectedCandidates.map((id) => {
                    const candidate = candidates.find((c) => c.id === id)!
                    return (
                      <Card key={id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                                <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <p className="text-sm font-medium">{candidate.name}</p>
                              <p className="text-xs text-muted-foreground">&lt;{candidate.email}&gt;</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handlePreview(candidate)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="py-3">
                          <p className="font-medium">{emailSubject}</p>
                          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                            {getPersonalizedEmail(candidate).substring(0, 100)}...
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showPreview && previewCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">メールプレビュー</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                閉じる
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">宛先:</p>
                <p>
                  {previewCandidate.name} &lt;{previewCandidate.email}&gt;
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">件名:</p>
                <p className="font-medium">{emailSubject}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">本文:</p>
                <div className="mt-2 p-4 border rounded-md whitespace-pre-line">
                  {getPersonalizedEmail(previewCandidate)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
