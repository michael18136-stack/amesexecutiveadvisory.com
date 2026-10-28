export async function onRequestPost({ request, env }) {
  const response = (data, status=200) => new Response(JSON.stringify(data), {status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
  let data; try { if (Number(request.headers.get('content-length')||0)>15000) return response({error:'Message is too long.'},413); data=await request.json(); } catch { return response({error:'Invalid request.'},400); }
  if (data.website) return response({ok:true});
  const clean = (v,max) => typeof v==='string' ? v.trim().slice(0,max) : '';
  const first=clean(data.firstName,80),last=clean(data.lastName,80),email=clean(data.email,254),company=clean(data.company,150),message=clean(data.message,5000);
  if (!first||!last||!message||!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) return response({error:'Please complete all required fields.'},400);
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) return response({error:'Contact form email delivery is not configured yet.'},503);
  const safe=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  try {
    const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM_EMAIL,to:['michael18136@gmail.com'],reply_to:email,subject:'Ames Executive Advisory — New Contact Form Message',html:`<h2>New website inquiry</h2><p><b>Name:</b> ${safe(first)} ${safe(last)}</p><p><b>Email:</b> ${safe(email)}</p><p><b>Company:</b> ${safe(company)}</p><p><b>Message:</b></p><p>${safe(message).replace(/\n/g,'<br>')}</p>`})});
    if(!result.ok) { console.error('Resend API failed',result.status,await result.text()); return response({error:'Message could not be delivered. Please email directly.'},502); }
    return response({ok:true});
  } catch(e) { console.error('Contact form error',e); return response({error:'Message could not be delivered. Please email directly.'},502); }
}
export function onRequestGet(){return new Response('Method not allowed',{status:405})}
