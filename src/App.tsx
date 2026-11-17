import { useState, useEffect } from 'react'
import { DollarSign, TrendingUp, Heart, Megaphone, Sparkles, Plus, ExternalLink, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

type Stream = {
  id: string
  name: string
  type: 'therapy' | 'digital' | 'affiliate' | 'merch' | 'grant' | 'membership' | 'property' | 'content' | 'booking' | 'other'
  monthly: number
  status: 'live' | 'building' | 'paused'
  url?: string
  notes: string
}

const initialStreams: Stream[] = [
  { id: '1', name: 'Sausage Therapy Sessions', type: 'therapy', monthly: 0, status: 'building', notes: 'NDIS / private bookings — connect Stripe' },
  { id: '2', name: 'Digital Therapy Guides', type: 'digital', monthly: 0, status: 'building', notes: 'Gumroad / own store passive' },
  { id: '3', name: 'Dachshund Merch', type: 'merch', monthly: 0, status: 'building', notes: 'Shopify / print-on-demand' },
  { id: '4', name: 'Affiliate Pet Wellness', type: 'affiliate', monthly: 0, status: 'live', url: '#', notes: 'Real affiliate links for approved products' },
  { id: '5', name: 'Grant Pipeline Tracker', type: 'grant', monthly: 0, status: 'building', notes: 'SPARK, NDIS, Female Founders' },
  { id: '6', name: 'Membership Community', type: 'membership', monthly: 0, status: 'building', notes: 'Peaceful balance inner circle' },
  { id: '7', name: 'Content Licensing', type: 'content', monthly: 0, status: 'building', notes: 'Stock + visual upsurge' },
  { id: '8', name: 'Property Cashflow', type: 'property', monthly: 0, status: 'paused', notes: 'Cooran / Brisbane optimization' },
  { id: '9', name: 'Booking Portal', type: 'booking', monthly: 0, status: 'building', notes: 'Automated therapy scheduling' },
  { id: '10', name: 'Micro Yields & Other', type: 'other', monthly: 0, status: 'live', notes: 'Crypto yields, micro-tasks when safe' },
]

const chartData = [
  { name: 'Week 1', revenue: 0, target: 500 },
  { name: 'Week 2', revenue: 0, target: 1200 },
  { name: 'Week 3', revenue: 0, target: 2500 },
  { name: 'Week 4', revenue: 0, target: 4000 },
]

export default function App() {
  const [streams, setStreams] = useState<Stream[]>(() => {
    const saved = localStorage.getItem('lifemaker-streams')
    return saved ? JSON.parse(saved) : initialStreams
  })
  const [total, setTotal] = useState(0)
  const [campaigns, setCampaigns] = useState([
    { id: 'c1', name: 'Peaceful Balance Launch', budget: 200, status: 'draft', feel: 'calm + hopeful' },
    { id: 'c2', name: 'Therapy Session Push', budget: 150, status: 'ready', feel: 'warm + trustworthy' },
  ])
  const [newStreamName, setNewStreamName] = useState('')
  const [humanFeel, setHumanFeel] = useState('pure, peaceful, giving-first, zero pressure')

  useEffect(() => {
    const sum = streams.reduce((acc, s) => acc + s.monthly, 0)
    setTotal(sum)
    localStorage.setItem('lifemaker-streams', JSON.stringify(streams))
  }, [streams])

  const addStream = () => {
    if (!newStreamName.trim()) return
    setStreams([...streams, {
      id: Date.now().toString(),
      name: newStreamName,
      type: 'other',
      monthly: 0,
      status: 'building',
      notes: 'New real income stream — connect payments'
    }])
    setNewStreamName('')
  }

  const updateMonthly = (id: string, value: number) => {
    setStreams(streams.map(s => s.id === id ? { ...s, monthly: value } : s))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 text-slate-800">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-peace w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Life Maker Profit Monitor</h1>
              <p className="text-sm text-slate-500">Real passive streams → pure & peaceful balance</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-surge">${total.toLocaleString()}</div>
            <div className="text-xs text-slate-500">tracked monthly</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <DollarSign className="text-surge mb-2" />
            <div className="text-sm text-slate-500">Total Tracked</div>
            <div className="text-2xl font-bold">${total.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <TrendingUp className="text-peace mb-2" />
            <div className="text-sm text-slate-500">Active Streams</div>
            <div className="text-2xl font-bold">{streams.filter(s => s.status === 'live').length}/10</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <Heart className="text-rose-500 mb-2" />
            <div className="text-sm text-slate-500">Human Feel</div>
            <div className="text-lg font-medium">{humanFeel}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <Megaphone className="text-amber-500 mb-2" />
            <div className="text-sm text-slate-500">Campaigns Ready</div>
            <div className="text-2xl font-bold">{campaigns.length}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="font-semibold mb-4">Revenue Trajectory (real numbers once connected)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                <Line type="monotone" dataKey="target" stroke="#0ea5e9" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Streams */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">10 Real Income Streams</h2>
            <div className="flex gap-2">
              <input
                value={newStreamName}
                onChange={e => setNewStreamName(e.target.value)}
                placeholder="Add new stream..."
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <button onClick={addStream} className="bg-surge text-white px-4 py-2 rounded-lg flex items-center gap-1 text-sm">
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {streams.map(stream => (
              <div key={stream.id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-slate-50">
                <div className="w-32 text-sm font-medium">{stream.type}</div>
                <div className="flex-1">
                  <div className="font-medium">{stream.name}</div>
                  <div className="text-xs text-slate-500">{stream.notes}</div>
                </div>
                <input
                  type="number"
                  value={stream.monthly}
                  onChange={e => updateMonthly(stream.id, Number(e.target.value))}
                  className="w-24 border rounded px-2 py-1 text-right"
                  placeholder="0"
                />
                <span className={`text-xs px-2 py-1 rounded-full ${stream.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {stream.status}
                </span>
                {stream.url && <ExternalLink size={16} className="text-slate-400" />}
              </div>
            ))}
          </div>
        </div>

        {/* Human Feel Optimizer + Campaigns */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><Heart size={18} /> Human Feel Optimizer</h2>
            <p className="text-sm text-slate-600 mb-4">Tune messaging so every touch feels pure, peaceful, and giving-first. No pressure, only invitation.</p>
            <textarea
              value={humanFeel}
              onChange={e => setHumanFeel(e.target.value)}
              className="w-full border rounded-lg p-3 text-sm h-24"
            />
            <button className="mt-3 bg-peace text-white px-4 py-2 rounded-lg text-sm">Save Feel Profile</button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><Megaphone size={18} /> Paid Marketing Campaigns</h2>
            <div className="space-y-3">
              {campaigns.map(c => (
                <div key={c.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-xs text-slate-500">Feel: {c.feel} · ${c.budget} budget</div>
                  </div>
                  <button className="text-xs bg-amber-500 text-white px-3 py-1 rounded">Launch</button>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border-2 border-dashed border-slate-300 rounded-lg py-2 text-sm text-slate-500">+ New Campaign</button>
          </div>
        </div>

        <div className="text-center text-sm text-slate-400 pt-8">
          Life Maker · Forevermore Farm · Sausage Therapy · Real systems for pure & peaceful balance<br />
          Connect Stripe, Gumroad, Shopify, or affiliate networks to turn tracked numbers into actual money.
        </div>
      </main>
    </div>
  )
}
