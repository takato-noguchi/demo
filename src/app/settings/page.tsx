'use client';

import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col px-4 lg:px-6 py-6">
          <h1 className="text-2xl font-semibold mb-4">設定</h1>

          {/* タブ */}
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">会社設定</TabsTrigger>
              <TabsTrigger value="security">パスワード変更</TabsTrigger>
              <TabsTrigger value="notifications">通知設定</TabsTrigger>
              <TabsTrigger value="billing">支払い設定</TabsTrigger>
            </TabsList>

            {/* アカウント情報 */}
            <TabsContent value="account">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>会社設定</CardTitle>
                    <CardDescription>
                      お名前やメールアドレスを更新できます。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">お名前</label>
                      <Input defaultValue="野口 賢人" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">メールアドレス</label>
                      <Input type="email" defaultValue="noguchi@example.com" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* パスワード変更 */}
            <TabsContent value="security">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>パスワード変更</CardTitle>
                    <CardDescription>
                      現在のパスワードや新しいパスワードを変更できます。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">現在のパスワード</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">新しいパスワード</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">新しいパスワード（確認）</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 通知設定 */}
            <TabsContent value="notifications">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>通知設定</CardTitle>
                    <CardDescription>メール通知の受信設定を管理します。</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>ニュースレターを受け取る</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>新着メッセージ通知</span>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 通知設定 */}
            <TabsContent value="billing">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>通知設定</CardTitle>
                    <CardDescription>メール通知の受信設定を管理します。</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>ニュースレターを受け取る</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>新着メッセージ通知</span>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* 保存ボタン */}
          <div className="mt-6 flex justify-end">
            <Button>保存</Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
