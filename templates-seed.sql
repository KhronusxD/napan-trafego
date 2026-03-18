-- Insert 3 default client templates
INSERT INTO client_templates (id, name, description, is_active, column_mapping) VALUES

-- Template 1: Default (E-commerce)
('default', 'Padrão (E-commerce)', 'Template padrão para lojas e-commerce. Usa nomes de coluna diretos.', true, '{
  "revenue": {
    "date": ["Data", ""],
    "payment": ["Pedidos Pagos", "Faturamento"],
    "quantity": ["Quantidade Pedidos"]
  },
  "traffic": {
    "date": ["Data", ""],
    "investment": ["Investimento"],
    "revenue": ["Faturamento Meta Ads"],
    "purchases": ["Compras Meta"],
    "clicks": ["Cliques no Link"],
    "pageViews": ["Visualizações de Página"],
    "cartAdditions": ["Adições no Carrinho"]
  },
  "googleAds": {
    "date": ["Data", ""],
    "investment": ["Investimento"],
    "revenue": ["Valor da conversão"],
    "conversions": ["Conversões"],
    "clicks": ["Cliques"],
    "cartAdditions": ["Adições ao carrinho"]
  }
}'),

-- Template 2: WhatsApp / Leads
('whatsapp', 'WhatsApp / Leads', 'Para clientes que usam WhatsApp como canal principal. Colunas com múltiplos nomes para fallback.', true, '{
  "revenue": {
    "date": ["Data", ""],
    "payment": ["Faturamento", "$ Total Tráfego", "$ Total WhatsApp"],
    "quantity": ["Fechamentos", "Qtd. Fechamentos"]
  },
  "traffic": {
    "date": ["Data", ""],
    "investment": ["Investimento Meta Ads", "Invest. Meta Ads", "Invest. Meta"],
    "revenue": ["Faturamento Meta Ads", "$ Total WhatsApp"],
    "purchases": [],
    "clicks": [],
    "pageViews": [],
    "cartAdditions": ["Leads Totais", "Leads WhatsApp (Meta + Google)", "Leads WhatsApp"],
    "zeroFill": ["Compras Meta", "Cliques no Link", "Visualizações de Página"]
  },
  "googleAds": {
    "date": ["Data", ""],
    "investment": ["Investimento Google Ads", "Invest. Google Ads", "Invest. Google"],
    "revenue": ["Faturamento Google Ads"],
    "conversions": [],
    "clicks": [],
    "cartAdditions": [],
    "zeroFill": ["Conversões", "Cliques", "Adições ao carrinho"]
  }
}'),

-- Template 3: Serviços
('servicos', 'Serviços', 'Para negócios de serviços (inspeção, consultoria, etc). Faturamento por serviço prestado.', true, '{
  "revenue": {
    "date": ["Data", ""],
    "payment": ["Faturamento Diário"],
    "quantity": ["Serviço aprovado"]
  },
  "traffic": {
    "date": ["Data", ""],
    "investment": ["Investimento"],
    "revenue": [],
    "purchases": [],
    "clicks": ["Cliques"],
    "pageViews": [],
    "cartAdditions": ["Mensagens"],
    "zeroFill": ["Faturamento Meta Ads", "Compras Meta", "Visualizações de Página"]
  },
  "googleAds": {
    "date": ["Data", ""],
    "investment": ["Investimento"],
    "revenue": ["Faturamento Google Ads"],
    "conversions": ["Conversões"],
    "clicks": ["Cliques no Link"],
    "cartAdditions": [],
    "zeroFill": ["Adições ao carrinho"]
  }
}');

-- Agora atualizar as empresas existentes para usar os templates
UPDATE companies SET template_id = 'default' WHERE type = 'default';
UPDATE companies SET template_id = 'whatsapp' WHERE type = 'whatsapp';
UPDATE companies SET template_id = 'servicos' WHERE type = 'itv-manaus';
