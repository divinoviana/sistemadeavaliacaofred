const { createClient } = require("@supabase/supabase-js");
const sb = createClient("https://roakqjszitzncohzwdpo.supabase.co", "sb_publishable_hLFVCVTZm9rwz45ORYRzyw_jV3VD26M");
(async () => {
  const testEmail = `teste.cadastro.${Date.now()}@example.com`;

  console.log("=== Testando senhas curtas/simples ===");
  for (const pw of ["123456", "abc123", "senha", "12345678", "Password1"]) {
    const { error } = await sb.auth.signUp({ email: testEmail, password: pw });
    console.log(`  pw="${pw}" (${pw.length} chars) →`, error?.message || "✅ ok");
    if (!error) {
      // limpa
      await sb.auth.signOut();
      break;
    }
  }

  console.log("\n=== Testando insert em students após signup ===");
  const goodEmail = `teste.full.${Date.now()}@example.com`;
  const { data, error } = await sb.auth.signUp({
    email: goodEmail,
    password: "MinhaSenha2026!"
  });
  if (error) {
    console.log("signup:", error.message);
  } else {
    console.log("signup ok, user.id:", data.user?.id);
    console.log("session:", data.session ? "✅ logado automaticamente" : "❌ precisa confirmar email primeiro");

    // Tenta inserir em students
    if (data.user?.id) {
      const ins = await sb.from("students").upsert({
        id: data.user.id,
        name: "Teste",
        email: goodEmail,
        school_class: "13.01",
        grade: "1",
        photo_url: null,
        role: "student",
      }, { onConflict: "id" });
      console.log("students upsert:", ins.error?.message || "✅ ok");
    }
  }
  await sb.auth.signOut();
})();
