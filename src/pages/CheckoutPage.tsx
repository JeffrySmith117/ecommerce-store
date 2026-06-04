import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react'

type PaymentMethod = 'credito' | 'debito' | 'pix' | null
type Step = 'pagamento' | 'confirmado'

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const [method, setMethod] = useState<PaymentMethod>(null)
  const [parcelas, setParcelas] = useState(1)
  const [step, setStep] = useState<Step>('pagamento')
  const [form, setForm] = useState({ nome: '', numero: '', validade: '', cvv: '' })
  const total = state.total
  const podeParcela = total >= 100
  const gerarParcelas = () => {
    const opcoes = []
    for (let i = 1; i <= 12; i++) {
      let valor = total / i
      let label = ''
      if (i <= 3) { label = i + 'x de R$ ' + valor.toFixed(2).replace('.', ',') + ' sem juros' }
      else { valor = valor * 1.0199; label = i + 'x de R$ ' + valor.toFixed(2).replace('.', ',') + ' com juros' }
      opcoes.push({ i, label })
    }
    return opcoes
  }
  const handleConfirmar = () => { if (!method) return; clearCart(); setStep('confirmado') }
  const formatPrice = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  if (step === 'confirmado') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="flex justify-center mb-4"><CheckCircle size={64} className="text-green-500" /></div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h2>
          <p className="text-gray-500 mb-6">Obrigado pela sua compra.</p>
          {method === 'pix' && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
              <p className="text-green-700 font-semibold text-sm">Chave Pix gerada!</p>
              <div className="mt-3 bg-white border border-green-200 rounded-xl p-3 font-mono text-xs text-gray-600">mercadostore@pix.com.br</div>
            </div>
          )}
          <a href="/" className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-2xl transition-colors">Voltar a Loja</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-6">Finalizar Compra</h1>
          <div className={`bg-white rounded-3xl border-2 transition-all cursor-pointer ${method === 'credito' ? 'border-primary-600 shadow-md' : 'border-gray-100'}`} onClick={() => setMethod('credito')}>
            <div className="flex items-center gap-4 p-5">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'credito' ? 'border-primary-600' : 'border-gray-300'}`}>
                {method === 'credito' && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
              </div>
              <CreditCard size={22} className="text-primary-600" />
              <span className="font-semibold text-gray-800">Cartao de Credito</span>
              {podeParcela && <span className="ml-auto text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">ate 12x</span>}
            </div>
            {method === 'credito' && (
              <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
                <input placeholder="Nome no cartao" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                <input placeholder="Numero do cartao" maxLength={19} value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Validade MM/AA" maxLength={5} value={form.validade} onChange={e => setForm({ ...form, validade: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                  <input placeholder="CVV" maxLength={3} value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value })} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                </div>
                {podeParcela && (
                  <select value={parcelas} onChange={e => setParcelas(Number(e.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none">
                    {gerarParcelas().map(({ i, label }) => <option key={i} value={i}>{label}</option>)}
                  </select>
                )}
              </div>
            )}
          </div>
          <div className={`bg-white rounded-3xl border-2 transition-all cursor-pointer ${method === 'debito' ? 'border-primary-600 shadow-md' : 'border-gray-100'}`} onClick={() => setMethod('debito')}>
            <div className="flex items-center gap-4 p-5">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'debito' ? 'border-primary-600' : 'border-gray-300'}`}>
                {method === 'debito' && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
              </div>
              <CreditCard size={22} className="text-blue-500" />
              <span className="font-semibold text-gray-800">Cartao de Debito</span>
              <span className="ml-auto text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">A vista</span>
            </div>
            {method === 'debito' && (
              <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
                <input placeholder="Nome no cartao" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                <input placeholder="Numero do cartao" maxLength={19} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Validade MM/AA" maxLength={5} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                  <input placeholder="CVV" maxLength={3} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                </div>
              </div>
            )}
          </div>
          <div className={`bg-white rounded-3xl border-2 transition-all cursor-pointer ${method === 'pix' ? 'border-green-500 shadow-md' : 'border-gray-100'}`} onClick={() => setMethod('pix')}>
            <div className="flex items-center gap-4 p-5">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'pix' ? 'border-green-500' : 'border-gray-300'}`}>
                {method === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
              </div>
              <Smartphone size={22} className="text-green-500" />
              <span className="font-semibold text-gray-800">Pix</span>
              <span className="ml-auto text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">Aprovacao imediata</span>
            </div>
            {method === 'pix' && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">Apos confirmar, a chave Pix sera gerada.</p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Resumo</h2>
          <div className="space-y-3 mb-4">
            {state.items.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate max-w-[140px]">{item.product.name} x{item.quantity}</span>
                <span className="font-medium text-gray-800">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between text-sm text-gray-500"><span>Frete</span><span className="text-green-600 font-medium">Gratis</span></div>
          </div>
          <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-primary-600">{formatPrice(total)}</span>
          </div>
          <button onClick={handleConfirmar} disabled={!method || state.items.length === 0} className="mt-6 w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl transition-colors">
            {method ? 'Confirmar Pedido' : 'Selecione um pagamento'}
          </button>
        </div>
      </div>
    </div>
  )
}
