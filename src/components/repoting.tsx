"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, CheckCircle, XCircle, PieChart, LineChart, Download } from "lucide-react"

// 採用ステータスの定義
type CandidateStatus = "書類選考中" | "一次面接" | "二次面接" | "最終面接" | "内定" | "不採用" | "辞退"

// 候補者データの型定義
interface Candidate {
  id: string
  name: string
  email: string
  position: string
  department: string
  status: CandidateStatus
  source: string
  appliedDate: string
  lastUpdated: string
  avatar: string
  rating: number
}

// 採用ソースの定義
const recruitmentSources = ["リファラル", "求人サイト", "スカウト", "自社サイト", "転職エージェント", "SNS", "その他"]

// 部署の定義
const departments = ["エンジニアリング", "マーケティング", "営業", "カスタマーサポート", "人事", "経理", "デザイン"]

export default function CandidateReportingDashboard() {
  const [timeRange, setTimeRange] = useState<"今週" | "今月" | "今四半期" | "今年" | "全期間">("今月")
  const [filterDepartment, setFilterDepartment] = useState<string>("全て")
  const [searchQuery, setSearchQuery] = useState("")

  // サンプルデータ - 実際の実装では、APIからデータを取得します
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "田中 由紀",
      email: "tanaka.yuki@example.com",
      position: "フロントエンドエンジニア",
      department: "エンジニアリング",
      status: "二次面接",
      source: "リファラル",
      appliedDate: "2025-05-15",
      lastUpdated: "2025-06-01",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
    },
    {
      id: "2",
      name: "鈴木 陽翔",
      email: "suzuki.haruto@example.com",
      position: "バックエンドエンジニア",
      department: "エンジニアリング",
      status: "最終面接",
      source: "スカウト",
      appliedDate: "2025-05-10",
      lastUpdated: "2025-06-02",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
    },
    {
      id: "3",
      name: "佐藤 葵",
      email: "sato.aoi@example.com",
      position: "フルスタックエンジニア",
      department: "エンジニアリング",
      status: "内定",
      source: "求人サイト",
      appliedDate: "2025-04-20",
      lastUpdated: "2025-05-25",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
    },
    {
      id: "4",
      name: "渡辺 凛",
      email: "watanabe.rin@example.com",
      position: "DevOpsエンジニア",
      department: "エンジニアリング",
      status: "書類選考中",
      source: "転職エージェント",
      appliedDate: "2025-05-28",
      lastUpdated: "2025-05-28",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 3,
    },
    {
      id: "5",
      name: "山本 陽菜",
      email: "yamamoto.hina@example.com",
      position: "UI/UXデザイナー",
      department: "デザイン",
      status: "一次面接",
      source: "SNS",
      appliedDate: "2025-05-22",
      lastUpdated: "2025-05-30",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
    },
    {
      id: "6",
      name: "中村 大翔",
      email: "nakamura.hiroto@example.com",
      position: "マーケティングマネージャー",
      department: "マーケティング",
      status: "不採用",
      source: "自社サイト",
      appliedDate: "2025-05-05",
      lastUpdated: "2025-05-20",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 2,
    },
    {
      id: "7",
      name: "小林 結菜",
      email: "kobayashi.yuina@example.com",
      position: "セールスマネージャー",
      department: "営業",
      status: "辞退",
      source: "リファラル",
      appliedDate: "2025-04-15",
      lastUpdated: "2025-05-10",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
    },
    {
      id: "8",
      name: "加藤 蒼",
      email: "kato.ao@example.com",
      position: "カスタマーサクセスマネージャー",
      department: "カスタマーサポート",
      status: "二次面接",
      source: "転職エージェント",
      appliedDate: "2025-05-18",
      lastUpdated: "2025-06-03",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
    },
  ]

  // ステータス別の候補者数を計算
  const statusCounts = candidates.reduce(
    (acc, candidate) => {
      acc[candidate.status] = (acc[candidate.status] || 0) + 1
      return acc
    },
    {} as Record<CandidateStatus, number>,
  )

  // 部署別の候補者数を計算
  const departmentCounts = candidates.reduce(
    (acc, candidate) => {
      acc[candidate.department] = (acc[candidate.department] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // ソース別の候補者数を計算
  const sourceCounts = candidates.reduce(
    (acc, candidate) => {
      acc[candidate.source] = (acc[candidate.source] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // フィルタリングされた候補者リストを取得
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      searchQuery === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = filterDepartment === "全て" || candidate.department === filterDepartment

    return matchesSearch && matchesDepartment
  })

  // ステータスに応じたバッジの色を取得
  const getStatusBadgeVariant = (status: CandidateStatus) => {
    switch (status) {
      case "内定":
        return "success"
      case "不採用":
        return "destructive"
      case "辞退":
        return "outline"
      case "最終面接":
        return "default"
      case "二次面接":
        return "secondary"
      case "一次面接":
        return "secondary"
      case "書類選考中":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* ダッシュボードヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">採用候補者レポート</h2>
          <p className="text-muted-foreground">採用活動の進捗状況と候補者の分析</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="期間を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="今週">今週</SelectItem>
              <SelectItem value="今月">今月</SelectItem>
              <SelectItem value="今四半期">今四半期</SelectItem>
              <SelectItem value="今年">今年</SelectItem>
              <SelectItem value="全期間">全期間</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            レポート出力
          </Button>
        </div>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">総候補者数</p>
              <p className="text-3xl font-bold">{candidates.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">面接中</p>
              <p className="text-3xl font-bold">
                {statusCounts["一次面接"] + statusCounts["二次面接"] + statusCounts["最終面接"] || 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">内定者数</p>
              <p className="text-3xl font-bold">{statusCounts["内定"] || 0}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">不採用/辞退</p>
              <p className="text-3xl font-bold">{(statusCounts["不採用"] || 0) + (statusCounts["辞退"] || 0)}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* チャートとグラフ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>採用ステータス推移</CardTitle>
            <CardDescription>時間経過による候補者ステータスの変化</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <LineChart className="h-16 w-16 mb-2" />
              <p>ステータス推移グラフ</p>
              <p className="text-sm">（実際の実装では、時系列データのグラフが表示されます）</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>採用ソース分析</CardTitle>
            <CardDescription>候補者の応募経路</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <PieChart className="h-16 w-16 mb-2" />
              <p>応募経路グラフ</p>
              <p className="text-sm">（実際の実装では、円グラフが表示されます）</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 候補者リスト */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>候補者一覧</CardTitle>
              <CardDescription>全ての採用候補者と現在のステータス</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="候補者を検索..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="部署でフィルター" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全て">全ての部署</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
              <div className="col-span-4">候補者</div>
              <div className="col-span-2">部署</div>
              <div className="col-span-2">応募経路</div>
              <div className="col-span-2">応募日</div>
              <div className="col-span-2">ステータス</div>
            </div>
            <div className="divide-y">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <div key={candidate.id} className="grid grid-cols-12 p-4 text-sm items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground">{candidate.position}</p>
                      </div>
                    </div>
                    <div className="col-span-2">{candidate.department}</div>
                    <div className="col-span-2">{candidate.source}</div>
                    <div className="col-span-2">{formatDate(candidate.appliedDate)}</div>
                    <div className="col-span-2">
                      <Badge variant={getStatusBadgeVariant(candidate.status) as any}>{candidate.status}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">該当する候補者が見つかりません</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 部署別採用状況 */}
      <Card>
        <CardHeader>
          <CardTitle>部署別採用状況</CardTitle>
          <CardDescription>部署ごとの候補者数と進捗状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(departmentCounts).map(([department, count]) => {
              // 部署ごとの候補者のステータス内訳を計算
              const departmentCandidates = candidates.filter((c) => c.department === department)
              const inProgress = departmentCandidates.filter((c) =>
                ["書類選考中", "一次面接", "二次面接", "最終面接"].includes(c.status),
              ).length
              const offered = departmentCandidates.filter((c) => c.status === "内定").length
              const rejected = departmentCandidates.filter((c) => ["不採用", "辞退"].includes(c.status)).length

              // 進捗率を計算（内定者数 / 総候補者数）
              const progressPercentage =
                departmentCandidates.length > 0 ? Math.round((offered / departmentCandidates.length) * 100) : 0

              return (
                <div key={department}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{department}</p>
                      <p className="text-sm text-muted-foreground">
                        候補者数: {count}名（内定: {offered}名, 選考中: {inProgress}名, 不採用/辞退: {rejected}名）
                      </p>
                    </div>
                    <p className="text-sm font-medium">{progressPercentage}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${progressPercentage}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 日付をフォーマットする関数
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// 検索アイコンコンポーネント
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
