import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography, fonts } from '../../../shared/theme';
import { SalonHeader } from '../../../shared/components/SalonHeader';
import {
  mockCategories,
  mockServicesList,
  ServiceCategory,
  ServiceItem,
  formatRupee,
} from '../../../shared/api/mockData';

const CATEGORY_COLORS = [
  '#E09F8F', // Coral Peach
  '#A9BEA9', // Sage Green
  '#C8B6CD', // Lavender Lilac
  '#D2BE98', // Sand Gold
  '#A4BCC7', // Powder Blue
  '#EABFA2', // Soft Apricot
];

const CATEGORY_ICONS: Array<keyof typeof Ionicons.glyphMap> = [
  'cut-outline',
  'sparkles-outline',
  'brush-outline',
  'color-palette-outline',
  'flower-outline',
];

export const ServicesScreen = () => {
  const [activeSegment, setActiveSegment] = useState<'categories' | 'serviceList'>('categories');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<ServiceCategory[]>(mockCategories);
  const [services, setServices] = useState<ServiceItem[]>(mockServicesList);

  // Category Modal State (Add or Edit)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(CATEGORY_COLORS[0]);

  // Service Modal State (Add or Edit)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Hair');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDuration, setServiceDuration] = useState('60m');
  const [serviceDesc, setServiceDesc] = useState('');
  const [isPopular, setIsPopular] = useState(true);

  // Open Edit Category Modal
  const handleOpenEditCategory = (category: ServiceCategory) => {
    setEditingCategory(category);
    setCatName(category.name);
    setCatDesc('');
    setSelectedIconIndex(category.name.includes('Hair') ? 0 : category.name.includes('Skin') ? 1 : 2);
    setSelectedColor(CATEGORY_COLORS[0]);
    setIsCategoryModalOpen(true);
  };

  // Open Add Category Modal
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCatName('');
    setCatDesc('');
    setSelectedIconIndex(0);
    setSelectedColor(CATEGORY_COLORS[0]);
    setIsCategoryModalOpen(true);
  };

  // Save Category (Create or Update)
  const handleSaveCategory = () => {
    if (!catName.trim()) return;

    if (editingCategory) {
      // Update existing
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: catName.trim() }
            : c
        )
      );
    } else {
      // Create new
      setCategories([
        ...categories,
        {
          id: `cat_${Date.now()}`,
          name: catName.trim(),
          serviceCount: 0,
          imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&auto=format&fit=crop&q=60',
        },
      ]);
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  // Delete Category
  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  // Click on a Category Card -> Switch to Service List and filter by that category
  const handleCategoryCardPress = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActiveSegment('serviceList');
  };

  // Open Edit Service Modal
  const handleOpenEditService = (service: ServiceItem) => {
    setEditingService(service);
    setServiceName(service.name);
    setServiceCategory(service.category);
    setServicePrice(service.price.toString());
    setServiceDuration(service.duration);
    setServiceDesc('');
    setIsPopular(!!service.popular);
    setIsServiceModalOpen(true);
  };

  // Open Add Service Modal
  const handleOpenAddService = () => {
    setEditingService(null);
    setServiceName('');
    setServiceCategory(selectedCategoryFilter || 'Hair');
    setServicePrice('2500');
    setServiceDuration('1h');
    setServiceDesc('');
    setIsPopular(true);
    setIsServiceModalOpen(true);
  };

  // Save Service (Create or Update)
  const handleSaveService = () => {
    if (!serviceName.trim()) return;

    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                name: serviceName.trim(),
                category: serviceCategory,
                price: Number(servicePrice) || s.price,
                duration: serviceDuration,
                popular: isPopular,
              }
            : s
        )
      );
    } else {
      setServices([
        ...services,
        {
          id: `srv_${Date.now()}`,
          name: serviceName.trim(),
          category: serviceCategory,
          duration: serviceDuration,
          price: Number(servicePrice) || 2000,
          popular: isPopular,
        },
      ]);
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // Delete Service
  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // Filter Services by Category and Search Text
  const filteredServices = services.filter((s) => {
    const matchesCategory =
      !selectedCategoryFilter || selectedCategoryFilter === 'All'
        ? true
        : s.category.toLowerCase() === selectedCategoryFilter.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.screen}>
      <SalonHeader
        rightActionIcon="add"
        rightActionVariant="dark"
        onRightActionPress={() =>
          activeSegment === 'categories'
            ? handleOpenAddCategory()
            : handleOpenAddService()
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.headerSection}>
          <Text style={styles.caption}>THE TREATMENT MENU</Text>
          <Text style={styles.title}>
            Services & <Text style={{ fontStyle: 'italic', fontWeight: '400' }}>rituals.</Text>
          </Text>
        </View>

        {/* Segmented Control: Categories vs Service list */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'categories' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveSegment('categories')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'categories' && styles.segmentTextActive,
              ]}
            >
              Categories
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'serviceList' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveSegment('serviceList')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'serviceList' && styles.segmentTextActive,
              ]}
            >
              Service list
            </Text>
          </TouchableOpacity>
        </View>

        {/* ============================================================ */}
        {/* VIEW 1: CATEGORIES GRID                                      */}
        {/* ============================================================ */}
        {activeSegment === 'categories' ? (
          <View>
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text style={styles.subCaption}>SERVICE CATEGORIES</Text>
                <Text style={styles.subTitle}>Explore your menu</Text>
              </View>
              <Text style={styles.countBadge}>{categories.length} categories</Text>
            </View>

            {/* 2-Column Categories Grid */}
            <View style={styles.categoryGrid}>
              {categories.map((cat) => {
                const count = services.filter((s) => s.category.toLowerCase() === cat.name.toLowerCase()).length;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={styles.categoryCard}
                    activeOpacity={0.88}
                    onPress={() => handleCategoryCardPress(cat.name)}
                  >
                    <Image source={{ uri: cat.imageUrl }} style={styles.categoryImage} />
                    <View style={styles.categoryOverlay}>
                      <View style={styles.categoryHeader}>
                        {/* Eye / View Icon */}
                        <View style={styles.actionIconCircle}>
                          <Ionicons name="eye-outline" size={13} color={colors.plumDeep} />
                        </View>

                        {/* Pencil (Edit Category) Icon */}
                        <TouchableOpacity
                          style={styles.actionIconCircle}
                          activeOpacity={0.8}
                          onPress={(e) => {
                            e.stopPropagation();
                            handleOpenEditCategory(cat);
                          }}
                        >
                          <Ionicons name="pencil" size={13} color={colors.plumDeep} />
                        </TouchableOpacity>
                      </View>

                      <View>
                        <Text style={styles.categoryName}>{cat.name}</Text>
                        <Text style={styles.categoryServicesText}>
                          {count > 0 ? count : cat.serviceCount} services
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          /* ============================================================ */
          /* VIEW 2: SERVICE LIST VIEW (Image 3)                          */
          /* ============================================================ */
          <View>
            {/* Search Bar + White Square Add Button */}
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={17} color="#A39388" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search treatments..."
                  placeholderTextColor="#A39388"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity
                style={styles.addServiceBtnSquare}
                onPress={handleOpenAddService}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={22} color={colors.plumDeep} />
              </TouchableOpacity>
            </View>

            {/* Category Filter Chips Horizontal Scroll */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              <TouchableOpacity
                style={[
                  styles.filterPill,
                  (!selectedCategoryFilter || selectedCategoryFilter === 'All') && styles.filterPillActive,
                ]}
                onPress={() => setSelectedCategoryFilter('All')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    (!selectedCategoryFilter || selectedCategoryFilter === 'All') && styles.filterPillTextActive,
                  ]}
                >
                  All ({services.length})
                </Text>
              </TouchableOpacity>

              {categories.map((cat) => {
                const count = services.filter((s) => s.category.toLowerCase() === cat.name.toLowerCase()).length;
                const isSelected = selectedCategoryFilter?.toLowerCase() === cat.name.toLowerCase();
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.filterPill, isSelected && styles.filterPillActive]}
                    onPress={() => setSelectedCategoryFilter(cat.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.filterPillText, isSelected && styles.filterPillTextActive]}>
                      {cat.name} ({count > 0 ? count : cat.serviceCount})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Showing Count Indicator */}
            <View style={styles.countRow}>
              <Text style={styles.showingText}>
                Showing <Text style={{ fontWeight: '700', color: colors.plumDeep }}>{filteredServices.length} services</Text>
                {selectedCategoryFilter && selectedCategoryFilter !== 'All' ? ` in ${selectedCategoryFilter}` : ''}
              </Text>
            </View>

            {/* Continuous White Container Card for Services List (Image 3) */}
            <View style={styles.servicesCardContainer}>
              {filteredServices.map((service, index) => {
                const isLast = index === filteredServices.length - 1;
                return (
                  <TouchableOpacity
                    key={service.id}
                    style={[
                      styles.serviceRowItem,
                      !isLast && styles.serviceRowDivider,
                    ]}
                    onPress={() => handleOpenEditService(service)}
                    activeOpacity={0.7}
                  >
                    {/* Initial Letter Avatar Box */}
                    <View style={styles.serviceAvatar}>
                      <Text style={styles.serviceAvatarText}>
                        {service.name.charAt(0)}
                      </Text>
                    </View>

                    {/* Service Info */}
                    <View style={styles.serviceInfo}>
                      <Text style={styles.serviceName}>{service.name}</Text>
                      <View style={styles.serviceMetaRow}>
                        <Text style={styles.serviceCategoryText}>{service.category}</Text>
                        {service.popular && (
                          <View style={styles.popularBadge}>
                            <Text style={styles.popularBadgeText}>Popular</Text>
                          </View>
                        )}
                      </View>
                    </View>

                    {/* Service Price & Dashes */}
                    <View style={styles.servicePriceBlock}>
                      <Text style={styles.servicePrice}>
                        {formatRupee(service.price)}
                      </Text>
                      <Text style={styles.serviceActionDashes}>--</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ============================================================ */}
      {/* MODAL 1: NEW / EDIT CATEGORY MODAL                           */}
      {/* ============================================================ */}
      <Modal visible={isCategoryModalOpen} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalEyebrow}>SERVICE CATEGORIES</Text>
                <Text style={styles.modalTitle}>
                  {editingCategory ? 'Edit category' : 'New category'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseCircle}
                onPress={() => {
                  setIsCategoryModalOpen(false);
                  setEditingCategory(null);
                }}
              >
                <Ionicons name="close" size={18} color={colors.plumDeep} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 520 }}>
              {/* Category Name */}
              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>CATEGORY NAME</Text>
                <Text style={styles.charCounter}>{catName.length}/30</Text>
              </View>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Bridal Packages"
                placeholderTextColor={colors.textMuted}
                value={catName}
                onChangeText={(t) => setCatName(t.slice(0, 30))}
                maxLength={30}
              />

              {/* Short Description */}
              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>SHORT DESCRIPTION</Text>
                <Text style={styles.optionalBadge}>optional</Text>
              </View>
              <TextInput
                style={[styles.modalInput, { height: 70, textAlignVertical: 'top' }]}
                placeholder="What treatments does this category include?"
                placeholderTextColor={colors.textMuted}
                multiline
                value={catDesc}
                onChangeText={setCatDesc}
              />

              {/* Category Photo */}
              <View style={styles.inputHeaderRow}>
                <Text style={styles.inputLabel}>CATEGORY PHOTO</Text>
                <Text style={styles.optionalBadge}>optional</Text>
              </View>
              <View style={styles.photoUploadRow}>
                <View style={styles.photoPreviewBox}>
                  <Ionicons name="image-outline" size={24} color={colors.textMuted} />
                </View>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
                    <Text style={styles.uploadBtnText}>Upload photo</Text>
                  </TouchableOpacity>
                  <Text style={styles.photoHelpText}>
                    JPG or PNG. Without a photo the card uses the colour below.
                  </Text>
                </View>
              </View>

              {/* Icon Selector */}
              <Text style={[styles.inputLabel, { marginTop: spacing.md }]}>ICON</Text>
              <View style={styles.iconSelectionRow}>
                {CATEGORY_ICONS.map((iconName, index) => (
                  <TouchableOpacity
                    key={iconName}
                    style={[
                      styles.iconSelectCircle,
                      selectedIconIndex === index && styles.iconSelectCircleActive,
                    ]}
                    onPress={() => setSelectedIconIndex(index)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={iconName}
                      size={18}
                      color={selectedIconIndex === index ? colors.plumDeep : colors.purple}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Card Colour Selector */}
              <Text style={[styles.inputLabel, { marginTop: spacing.md }]}>CARD COLOUR</Text>
              <View style={styles.colorSelectionRow}>
                {CATEGORY_COLORS.map((hexColor) => (
                  <TouchableOpacity
                    key={hexColor}
                    style={[
                      styles.colorSwatchRing,
                      selectedColor === hexColor && styles.colorSwatchRingActive,
                    ]}
                    onPress={() => setSelectedColor(hexColor)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.colorSwatchDot, { backgroundColor: hexColor }]} />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Modal Buttons */}
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.btnSecondary}
                  onPress={() => {
                    setIsCategoryModalOpen(false);
                    setEditingCategory(null);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnSecondaryText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={handleSaveCategory}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnPrimaryText}>
                    {editingCategory ? 'Save changes' : 'Add category'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Delete Option if Editing */}
              {editingCategory && (
                <TouchableOpacity
                  style={styles.deleteLink}
                  onPress={() => handleDeleteCategory(editingCategory.id)}
                >
                  <Text style={styles.deleteLinkText}>Delete this category</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ============================================================ */}
      {/* MODAL 2: NEW / EDIT SERVICE MODAL                            */}
      {/* ============================================================ */}
      <Modal visible={isServiceModalOpen} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalEyebrow}>SERVICE LIST</Text>
                <Text style={styles.modalTitle}>
                  {editingService ? 'Edit service' : 'New service'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseCircle}
                onPress={() => {
                  setIsServiceModalOpen(false);
                  setEditingService(null);
                }}
              >
                <Ionicons name="close" size={18} color={colors.plumDeep} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 520 }}>
              <Text style={styles.inputLabel}>SERVICE NAME</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Signature Balayage"
                placeholderTextColor={colors.textMuted}
                value={serviceName}
                onChangeText={setServiceName}
              />

              <Text style={styles.inputLabel}>CATEGORY</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChoicePill,
                      serviceCategory.toLowerCase() === cat.name.toLowerCase() && styles.categoryChoicePillActive,
                    ]}
                    onPress={() => setServiceCategory(cat.name)}
                  >
                    <Text
                      style={[
                        styles.categoryChoicePillText,
                        serviceCategory.toLowerCase() === cat.name.toLowerCase() && styles.categoryChoicePillTextActive,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.twoColumnRow}>
                <View style={{ flex: 1, marginRight: spacing.sm }}>
                  <Text style={styles.inputLabel}>DURATION</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. 1h"
                    placeholderTextColor={colors.textMuted}
                    value={serviceDuration}
                    onChangeText={setServiceDuration}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                  <Text style={styles.inputLabel}>PRICE (₹)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. 2500"
                    placeholderTextColor={colors.textMuted}
                    value={servicePrice}
                    onChangeText={setServicePrice}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Quick Duration Chips */}
              <View style={styles.chipsRow}>
                {['30m', '45m', '1h', '1h 15m', '1h 30m', '2h', '2h 30m'].map((chip) => (
                  <TouchableOpacity
                    key={chip}
                    style={[styles.chip, serviceDuration === chip && styles.chipActive]}
                    onPress={() => setServiceDuration(chip)}
                  >
                    <Text style={[styles.chipText, serviceDuration === chip && styles.chipTextActive]}>
                      {chip}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>DESCRIPTION</Text>
              <TextInput
                style={[styles.modalInput, { height: 60 }]}
                placeholder="What does this service include?"
                placeholderTextColor={colors.textMuted}
                multiline
                value={serviceDesc}
                onChangeText={setServiceDesc}
              />

              {/* Popular Toggle */}
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Mark as popular</Text>
                <Switch
                  value={isPopular}
                  onValueChange={setIsPopular}
                  trackColor={{ false: colors.border, true: colors.plumDeep }}
                  thumbColor={colors.white}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.btnSecondary}
                  onPress={() => {
                    setIsServiceModalOpen(false);
                    setEditingService(null);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnSecondaryText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={handleSaveService}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnPrimaryText}>
                    {editingService ? 'Save changes' : 'Add service'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Delete Service Option if Editing */}
              {editingService && (
                <TouchableOpacity
                  style={styles.deleteLink}
                  onPress={() => handleDeleteService(editingService.id)}
                >
                  <Text style={styles.deleteLinkText}>Delete this service</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lavender,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerSection: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  caption: {
    ...typography.captionTracked,
    color: '#9C7866',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.serifH1,
    fontSize: 28,
    color: '#2B0A3B',
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#22062C',
    borderRadius: radius.pill,
    padding: 3,
    marginBottom: spacing.lg,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: radius.pill,
  },
  segmentTabActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.72)',
  },
  segmentTextActive: {
    color: colors.plumDeep,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  subCaption: {
    ...typography.captionTracked,
    fontSize: 10,
    color: '#9C7866',
    marginBottom: 2,
  },
  subTitle: {
    ...typography.serifH2,
    fontSize: 18,
    color: colors.plumDeep,
  },
  countBadge: {
    fontSize: 12,
    color: colors.purple,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 180,
    borderRadius: radius.card,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  categoryOverlay: {
    flex: 1,
    backgroundColor: 'rgba(43, 10, 59, 0.42)',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  categoryServicesText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    height: 46,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 13,
    color: colors.textPrimary,
  },
  addServiceBtnSquare: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  filterScroll: {
    paddingBottom: spacing.sm,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: '#E6DCD2',
    marginRight: spacing.xs,
  },
  filterPillActive: {
    backgroundColor: colors.plumDeep,
    borderColor: colors.plumDeep,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.plumDeep,
  },
  filterPillTextActive: {
    color: colors.white,
  },
  countRow: {
    marginBottom: spacing.sm,
    marginTop: 2,
  },
  showingText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  servicesCardContainer: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  serviceRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  serviceRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5ECE5',
  },
  serviceAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F6ECE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  serviceAvatarText: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    fontWeight: '700',
    color: '#8A583B',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 3,
  },
  serviceMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceCategoryText: {
    fontSize: 12,
    color: '#8A7A70',
  },
  popularBadge: {
    backgroundColor: '#FBEBE4',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginLeft: spacing.xs,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#A06B55',
  },
  servicePriceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  serviceActionDashes: {
    fontSize: 14,
    color: '#C2B6AE',
    fontWeight: '600',
    letterSpacing: -1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FAF5EE',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 36 : spacing.xl,
    maxHeight: '90%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  modalEyebrow: {
    ...typography.captionTracked,
    fontSize: 10,
    color: '#8E685C',
    marginBottom: 2,
  },
  modalTitle: {
    ...typography.serifH2,
    fontSize: 22,
    color: colors.plumDeep,
  },
  modalCloseCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  inputLabel: {
    ...typography.captionTracked,
    fontSize: 10,
    color: '#8E685C',
  },
  charCounter: {
    fontSize: 10,
    color: colors.textMuted,
  },
  optionalBadge: {
    fontSize: 10,
    fontStyle: 'italic',
    color: colors.textMuted,
  },
  modalInput: {
    backgroundColor: '#F2E9DE',
    borderRadius: radius.input,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E5D6C7',
  },
  photoUploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  photoPreviewBox: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: '#EFE5D8',
    borderWidth: 1.5,
    borderColor: '#D8C6B3',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    backgroundColor: colors.plumDeep,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  uploadBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  photoHelpText: {
    fontSize: 10,
    color: colors.textMuted,
    lineHeight: 14,
  },
  iconSelectionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.md,
  },
  iconSelectCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F7EEF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  iconSelectCircleActive: {
    borderColor: colors.plumDeep,
    backgroundColor: colors.white,
  },
  colorSelectionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.lg,
  },
  colorSwatchRing: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSwatchRingActive: {
    borderColor: colors.plumDeep,
  },
  colorSwatchDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    gap: 12,
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.plumDeep,
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
  },
  btnPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.plumDeep,
    alignItems: 'center',
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  deleteLink: {
    marginTop: spacing.md,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  deleteLinkText: {
    fontSize: 12,
    color: colors.danger,
    fontWeight: '600',
  },
  categoryChoicePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: '#F2E9DE',
    marginRight: spacing.xs,
    borderWidth: 1,
    borderColor: '#E5D6C7',
  },
  categoryChoicePillActive: {
    backgroundColor: colors.plumDeep,
    borderColor: colors.plumDeep,
  },
  categoryChoicePillText: {
    fontSize: 12,
    color: colors.plumDeep,
    fontWeight: '600',
  },
  categoryChoicePillTextActive: {
    color: colors.white,
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: '#F2E9DE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#E5D6C7',
  },
  chipActive: {
    backgroundColor: colors.plumDeep,
    borderColor: colors.plumDeep,
  },
  chipText: {
    fontSize: 11,
    color: colors.plumDeep,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.white,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingVertical: 4,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.plumDeep,
  },
});
