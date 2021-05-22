class ParentInCustomizationsBackfiller
  def self.run
    CustomizableArea.all.each do |customizable_area|
      customizable_area.customizations.each do |customization|
        backfill_children(customization, customization.children)
      end
    end
  end

  def self.backfill_children(customization, children)
    Rails.logger.info "Backfilling: " + customization.inspect
    children.each do |child|
      if child.parent.present?
        Customization.create!(name: child.name, price_in_cents: child.price_in_cents, option_type: child.option_type, parent: customization)
        Rails.logger.info "Child created: " + child.inspect
      else
        child.parent = customization
        Rails.logger.info "Child updated with parent: " + child.inspect
        child.save!
      end
      backfill_children(child, child.children)
    end
  end
end